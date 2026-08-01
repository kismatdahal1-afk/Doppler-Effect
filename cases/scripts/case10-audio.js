/* ======================================================================
   CASE 10 — Sonic Boom Interactive Audio Section
   Isolated to the Case-10 page (script loaded only via case-10.html).
   Injects a self-contained glassmorphism audio card into the dynamically
   rendered case content, then drives a Web Audio API + Canvas player that
   visualises the actual audio waveform with a live playhead highlight.
   case.js / simulation.js / case.css are NOT modified.
   ====================================================================== */
(function () {
  'use strict';

  // Isolation guard — only run on the Sonic Boom case page.
  if (typeof CASE_ID === 'undefined' || CASE_ID !== 10) return;

  var AUDIO_SRC   = '../assets/sound/sonic-boom-sound.mp3';
  var WAVE_COLOR  = '#38BDF8';
  var WAVE_GLOW   = '#22D3EE';
  var CURSOR      = '#22D3EE';

  // inline SVG icons (consistent with the site's control buttons) — no emoji
  // glyphs, so they render crisply on mobile instead of as emoji.
  var ICON_PLAY  = '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 3l12 7-12 7z"/></svg>';
  var ICON_PAUSE = '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><rect x="3.5" y="3" width="5" height="14" rx="1.5"/><rect x="11.5" y="3" width="5" height="14" rx="1.5"/></svg>';

  var refs = {
    card: null, btn: null, btnIcon: null, btnLabel: null,
    canvas: null, ctx: null, dur: null, audio: null
  };

  var state = {
    playing: false,
    decodedMono: null,   // mixed-mono PCM samples of the whole clip
    decoded: false,      // static buffer cached after the first decode
    srcSet: false,       // audio.src assigned on first Play click only
    audioCtx: null,      // live context (AnalyserNode), created lazily on first play
    analyser: null,
    rafId: null
  };

  // cached per-column RMS of the waveform, invalidated on canvas-size change
  var cols = null, colsW = 0, colsMax = 1, rmsSmooth = 0;

  /* ===== card markup (hardcoded content per spec) ===== */
  function buildCardHTML() {
    return ''
      + '<div class="sonic-audio-card" id="sonicBoomAudio">'
      +   '<div class="sonic-audio__header">'
      + '<span class="sonic-audio__icon" aria-hidden="true">'
      +   '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/></svg>'
      + '</span>'
      +     '<div>'
      +       '<div class="sonic-audio__title">Hear the Sonic Boom</div>'
      +       '<p class="sonic-audio__desc">Experience how a real sonic boom sounds when an object exceeds the speed of sound.</p>'
      +     '</div>'
      +   '</div>'
      +   '<button type="button" id="sonicBoomPlayBtn" class="sonic-audio__play" aria-label="Play sonic boom audio">'
      +     '<span id="sonicBoomBtnIcon" aria-hidden="true">' + ICON_PLAY + '</span>'
      +     '<span id="sonicBoomBtnText">Play Sonic Boom</span>'
      +   '</button>'
      +   '<div class="sonic-audio__wave-wrap">'
      +     '<canvas id="sonicBoomCanvas" class="sonic-audio__wave" width="720" height="54"></canvas>'
      +   '</div>'
      +   '<div class="sonic-audio__meta">Duration \u2022 <span id="sonicBoomDur">\u2014</span></div>'
      + '</div>';
  }

  /* ===== inject into the dynamically-rendered case content ===== */
  function injectCard() {
    var cc = document.getElementById('caseContent');
    if (!cc) return false;
    if (cc.querySelector('#sonicBoomAudio')) return true;
    var divider = cc.querySelector('.case-divider');
    if (!divider) return false;
     divider.insertAdjacentHTML('afterend', buildCardHTML());
    cacheRefs();
    setupAudio();
    bindControls();
    window.addEventListener('resize', redraw);
    return true;
  }

  function cacheRefs() {
    var c = document.getElementById('sonicBoomAudio');
    if (!c) return;
    refs.card     = c;
    refs.btn      = c.querySelector('#sonicBoomPlayBtn');
    refs.btnIcon  = c.querySelector('#sonicBoomBtnIcon');
    refs.btnLabel = c.querySelector('#sonicBoomBtnText');
    refs.canvas   = c.querySelector('#sonicBoomCanvas');
    refs.ctx      = refs.canvas.getContext('2d');
    refs.dur      = c.querySelector('#sonicBoomDur');
  }

  /* ===== audio element + events ===== */
  function setupAudio() {
    if (refs.audio) return;
    var a = document.createElement('audio');
    a.preload = 'none';          // media element never fetches on its own; src is set lazily on first play
    a.style.display = 'none';
    document.body.appendChild(a);
    refs.audio = a;

    a.addEventListener('loadedmetadata', function () {
      if (refs.dur) refs.dur.textContent = formatDuration(a.duration);
    });
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);

    // Eager-but-background decode so the waveform is visible BY DEFAULT, before
    // any click. It is fully async (promise + off-main-thread decodeAudioData),
    // so it does NOT block page load, and its HTTP fetch is cached by the browser,
    // meaning the first Play click never fetches again.
    decodeStaticBuffer();
  }

  // first Play click: assign src (served from the cache the background decode
  // already populated) and start playback + live analyser context.
  function firstPlayInit() {
    if (!state.srcSet) { state.srcSet = true; refs.audio.src = AUDIO_SRC; }
    decodeStaticBuffer();            // no-op — already decoded at load
    refs.audio.play().catch(function () { });
  }

  function decodeStaticBuffer() {
    if (state.decoded) return;               // fetch + decode exactly once
    state.decoded = true;
    fetch(AUDIO_SRC).then(function (r) { return r.arrayBuffer(); })
      .then(function (ab) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        var tmp = new AC();              // throwaway context: closed right away
        tmp.decodeAudioData(ab).then(function (buf) {
          state.decodedMono = mixToMono(buf);
          cols = null; colsW = 0;        // invalidate column cache
          tmp.close();                  // -> no CPU consumed while idle
          if (refs.dur) refs.dur.textContent = formatDuration(buf.duration);
          renderWaveform();
        });
      })
      .catch(function () { /* waveform simply stays empty if decode fails */ });
  }

  function mixToMono(buf) {
    if (!buf || buf.numberOfChannels === 1) return buf && buf.getChannelData(0);
    var l = buf.getChannelData(0), r = buf.getChannelData(1);
    var out = new Float32Array(l.length);
    for (var i = 0; i < l.length; i++) out[i] = (l[i] + r[i]) / 2;
    return out;
  }

  /* ===== lazy live context (created only on first play, in a user gesture) ===== */
  function ensureLiveCtx() {
    if (state.audioCtx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    var ctx = new AC();
    var analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;
    var source = ctx.createMediaElementSource(refs.audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    state.audioCtx = ctx;
    state.analyser = analyser;
  }

  /* ===== canvas helpers ===== */
  function resizeCanvas() {
    var cv = refs.canvas;
    if (!cv) return;
    var dpr = window.devicePixelRatio || 1;
    var r = cv.getBoundingClientRect();
    var w = Math.max(1, Math.round(r.width * dpr));
    var h = Math.max(1, Math.round(r.height * dpr));
    // NOTE: no ctx.setTransform(dpr,...) here. Setting cv.width/cv.height
    // resets the transform to identity, so all drawing below (waveform, cursor)
    // happens in PHYSICAL pixels — consistent with `half = cv.height / 2`, so the
    // wave stays centered on every device. A dpr transform would double-scale the
    // amplitude on hi-DPI (mobile) screens and push the lower half off-canvas.
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
  }

  function clearCanvas() {
    var cv = refs.canvas, ctx = refs.ctx;
    if (!cv || !ctx) return;
    ctx.clearRect(0, 0, cv.width, cv.height);
  }

  // RMS energy per column — makes the full-duration envelope (including the
  // decaying boom tail) visible across the whole canvas, so all 7s render.
  function computeColumns() {
    if (!state.decodedMono || !refs.canvas) return;
    var w = refs.canvas.width;
    if (cols && colsW === w) return;
    var data = state.decodedMono;
    var step = Math.max(1, Math.floor(data.length / w));
    cols = new Array(w);
    colsMax = 0;
    for (var x = 0; x < w; x++) {
      var s = x * step, e = Math.min(s + step, data.length);
      var sum = 0;
      for (var i = s; i < e; i++) { var v = data[i]; sum += v * v; }
      var rms = Math.sqrt(sum / (e - s));
      if (rms > 1) rms = 1;
      if (rms > colsMax) colsMax = rms;
      cols[x] = rms;
    }
    colsW = w;
  }

  function drawWaveCols(ctx, colsArr, x0, x1, half, scale) {
    ctx.beginPath();
    for (var x = x0; x <= x1; x++) {
      var y = half - colsArr[x] * scale;
      if (x === x0) ctx.moveTo(x + 0.5, y); else ctx.lineTo(x + 0.5, y);
    }
    for (x = x1; x >= x0; x--) ctx.lineTo(x + 0.5, half + colsArr[x] * scale);
    ctx.closePath();
    ctx.fill();
  }

  function getRMS(an) {
    var bytes = new Uint8Array(an.frequencyBinCount);
    an.getByteTimeDomainData(bytes);
    var sum = 0;
    for (var i = 0; i < bytes.length; i++) {
      var d = (bytes[i] - 128) / 128;
      sum += d * d;
    }
    var r = Math.sqrt(sum / bytes.length);
    return r > 1 ? 1 : r;
  }

  /* ===== main render: base waveform + moving highlight + playhead ===== */
  function renderWaveform() {
    var ctx = refs.ctx, cv = refs.canvas;
    if (!ctx || !cv) return;
    resizeCanvas();
    computeColumns();
    if (!cols) return;

    var w = cv.width, h = cv.height, half = h / 2;
    var scale = half * 0.85 / (colsMax || 1);   // normalize so the loudest part fills the card
    var rms = 0;
    if (state.analyser) rms = getRMS(state.analyser);
    // low-pass the amplitude so the highlight glow pulses slowly/smoothly
    // instead of flickering with the boom's sharp crack (cursor line itself
    // stays locked to real playback time).
    rmsSmooth = rmsSmooth * 0.92 + rms * 0.08;

    // playhead fraction (0..1)
    var playhead = 0;
    if (state.playing && refs.audio && refs.audio.duration) {
      playhead = refs.audio.currentTime / refs.audio.duration;
    }
    var px = playhead * w;

    // Stop playback the INSTANT the highlight line visually touches the right
    // edge. The browser 'ended' event can lag ~10ms behind the clamped line,
    // which is exactly the "tail of sound after the line hits the edge" gap.
    // Cutting here makes line-at-right-edge == sound-stops, immediately.
    if (state.playing && px >= w - 1 && refs.audio) {
      onEnded();
      return;
    }

    clearCanvas();

    // background track
    ctx.fillStyle = 'rgba(56,189,248,.06)';
    ctx.fillRect(0, 0, w, h);

    // dim base waveform (full length, always visible)
    ctx.save();
    ctx.globalAlpha = 0.38;
    ctx.fillStyle = WAVE_COLOR;
    ctx.strokeStyle = WAVE_COLOR;
    ctx.shadowColor = WAVE_GLOW;
    ctx.shadowBlur = 6;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    drawWaveCols(ctx, cols, 0, w - 1, half, scale);
    ctx.restore();

    // highlighted "already heard" portion — sweeps across while playing
    if (state.playing && px > 1) {
      var hxLast = Math.min(w - 1, Math.floor(px));
      var glow = 16 + rmsSmooth * 18;          // slow, smooth amplitude pulse
      var alpha = 0.82 + rmsSmooth * 0.13;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = WAVE_COLOR;
      ctx.strokeStyle = WAVE_COLOR;
      ctx.shadowColor = WAVE_GLOW;
      ctx.shadowBlur = glow;
      drawWaveCols(ctx, cols, 0, hxLast, half, scale);
      ctx.restore();
    }

    // moving playhead cursor
    if (state.playing) {
      var cpx = Math.min(w - 1, Math.max(0, Math.floor(px)));
      ctx.save();
      ctx.strokeStyle = CURSOR;
      ctx.lineWidth = 2;
      ctx.shadowColor = CURSOR;
       ctx.shadowBlur = 22 + rmsSmooth * 10;
      ctx.beginPath();
      ctx.moveTo(cpx + 0.5, 8);
      ctx.lineTo(cpx + 0.5, h - 8);
      ctx.stroke();
      ctx.fillStyle = WAVE_COLOR;
      ctx.beginPath();
      ctx.arc(cpx, half, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /* ===== animation loop (only while playing) ===== */
  function step() {
    if (!state.playing) return;
    renderWaveform();
    state.rafId = requestAnimationFrame(step);
  }

  function stopLoop() {
    if (state.rafId) { cancelAnimationFrame(state.rafId); state.rafId = null; }
  }

  /* ===== playback lifecycle ===== */
  function onPlay() {
    state.playing = true;
    ensureLiveCtx();               // lazy live context + AnalyserNode (user gesture)
    setButton(true);
    renderWaveform();
    state.rafId = requestAnimationFrame(step);
  }

  function onPause() {
    if (!state.playing) return;
    state.playing = false;
    stopLoop();
    setButton(false);
    renderWaveform();
  }

  function onEnded() {
    state.playing = false;
    stopLoop();
    // pause() BEFORE resetting cursor so a manually-triggered end (line hit
    // right edge while still technically playing) never restarts playback.
    if (refs.audio) { refs.audio.pause(); refs.audio.currentTime = 0; }
    setButton(false);
    renderWaveform();
  }

  function setButton(playing) {
    if (refs.btnIcon)  refs.btnIcon.innerHTML  = playing ? ICON_PAUSE : ICON_PLAY;
    if (refs.btnLabel) refs.btnLabel.textContent = playing ? 'Pause' : 'Play Sonic Boom';
    if (refs.btn)      refs.btn.setAttribute('aria-label', playing ? 'Pause audio' : 'Play sonic boom audio');
  }

  function bindControls() {
    if (refs.btn) {
      refs.btn.addEventListener('click', function () {
        if (!refs.audio) return;
        if (state.playing) {
          refs.audio.pause();   // pause mid-play
          return;
        }
        // not playing -> first Play click fetches + decodes the audio (user gesture),
        // subsequent clicks just call .play() again (src + buffer already cached)
        firstPlayInit();
      });
    }
  }

  function formatDuration(sec) {
    if (!isFinite(sec) || sec < 0) return '\u2014';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
  }

  function redraw() { renderWaveform(); }

  /* ===== observe #caseContent; inject once case.js renders the divider ===== */
  function startObserver() {
    var cc = document.getElementById('caseContent');
    if (!cc) return;
    if (injectCard()) return;
    var obs = new MutationObserver(function () {
      if (injectCard()) {
        if (obs) obs.disconnect();
      }
    });
    obs.observe(cc, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }
})();
