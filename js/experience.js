/* ======================================================================
   EXPERIENCE VIDEO — custom controls + center play/pause overlay
   Center button and control bar toggle the video; fullscreen, mute,
   seek, and playback speed are handled here too.
   ====================================================================== */
(function(){
  var wrap = document.querySelector('.experience__video');
  if(!wrap) return;
  var video = wrap.querySelector('video');
  var centerBtn = document.getElementById('experiencePlayBtn');
  var barBtn = document.getElementById('ctlPlayBtn');
  var timeEl = document.getElementById('ctlTime');
  var durEl = document.getElementById('ctlDuration');
  var volBtn = document.getElementById('ctlVolumeBtn');
  var volSlider = document.getElementById('ctlVol');
  var fsBtn = document.getElementById('ctlFsBtn');
  var seek = document.getElementById('ctlSeek');
  if(!video) return;

  function fmt(t){
    if(!isFinite(t)) t = 0;
    var m = Math.floor(t/60);
    var s = Math.floor(t%60);
    return m+':'+(s<10?'0':'')+s;
  }

  function syncPlayIcon(){
    var playing = !video.paused;
    if(barBtn) barBtn.classList.toggle('is-active', playing);
    if(centerBtn){
      centerBtn.classList.toggle('is-playing', playing);
      centerBtn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
    }
    if(barBtn) barBtn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
  }

  function syncProgress(){
    if(!video.duration) return;
    var pct = (video.currentTime/video.duration)*100;
    seek.value = pct;
    seek.style.setProperty('--p', pct+'%');
    if(timeEl) timeEl.textContent = fmt(video.currentTime);
  }

  function syncBuffered(){
    if(!seek || !video.buffered || !video.buffered.length || !video.duration) return;
    var end = video.buffered.end(video.buffered.length-1);
    var pct = (end/video.duration)*100;
    var played = parseFloat(seek.value) || 0;
    seek.style.setProperty('--b', Math.max(pct, played)+'%');
  }

  function syncMuteIcon(){
    if(!volBtn) return;
    var muted = video.muted || video.volume === 0;
    volBtn.classList.toggle('is-muted', muted);
    volBtn.classList.toggle('is-low', !muted && video.volume <= 0.5);
    volBtn.setAttribute('aria-label', muted ? 'Unmute video' : 'Mute video');
    if(volSlider){
      volSlider.value = muted ? 0 : Math.round(video.volume*100);
      volSlider.style.setProperty('--p', volSlider.value+'%');
    }
  }

  function syncFsIcon(){
    if(!fsBtn) return;
    var fs = document.fullscreenElement || document.webkitFullscreenElement;
    fsBtn.classList.toggle('is-fs', !!fs);
    fsBtn.setAttribute('aria-label', fs ? 'Exit fullscreen' : 'Enter fullscreen');
  }

  function togglePlay(){
    if(video.paused){
      var p = video.play();
      if(p && p.catch) p.catch(function(){});
    } else {
      video.pause();
    }
  }

  if(centerBtn) centerBtn.addEventListener('click', function(e){ e.preventDefault(); togglePlay(); });
  if(barBtn) barBtn.addEventListener('click', function(e){ e.preventDefault(); togglePlay(); });
  video.addEventListener('click', togglePlay);

  wrap.addEventListener('keydown', function(e){
    if(e.code !== 'Space' && e.key !== ' ') return;
    var t = e.target;
    if(t && (t.closest('button') || t.closest('input'))) return;
    e.preventDefault();
    togglePlay();
  });

  video.addEventListener('play', syncPlayIcon);
  video.addEventListener('pause', syncPlayIcon);
  video.addEventListener('ended', function(){
    video.currentTime = 0;
    video.pause();
  });
  video.addEventListener('timeupdate', syncProgress);
  video.addEventListener('progress', syncBuffered);
  video.addEventListener('volumechange', syncMuteIcon);
  video.addEventListener('loadedmetadata', function(){
    if(durEl) durEl.textContent = fmt(video.duration);
    syncProgress();
  });
  document.addEventListener('fullscreenchange', syncFsIcon);
  document.addEventListener('webkitfullscreenchange', syncFsIcon);

  if(seek){
    seek.addEventListener('input', function(){
      if(!video.duration) return;
      video.currentTime = (seek.value/100)*video.duration;
      var pct = seek.value;
      seek.style.setProperty('--p', pct+'%');
      if(timeEl) timeEl.textContent = fmt(video.currentTime);
    });
  }

  if(volBtn){
    volBtn.addEventListener('click', function(){
      video.muted = !video.muted;
    });
  }

  if(volSlider){
    volSlider.addEventListener('input', function(){
      var v = parseInt(volSlider.value,10) || 0;
      video.volume = v/100;
      video.muted = v === 0;
      volSlider.style.setProperty('--p', v+'%');
    });
  }

  if(fsBtn){
    fsBtn.addEventListener('click', function(){
      if(document.fullscreenElement || document.webkitFullscreenElement){
        if(document.exitFullscreen) document.exitFullscreen();
        else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
      } else {
        var el = wrap;
        if(el.requestFullscreen) el.requestFullscreen();
        else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      }
    });
  }

  syncPlayIcon();
  syncMuteIcon();
  syncFsIcon();
})();
