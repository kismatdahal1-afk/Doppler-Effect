/* ======================================================================
   SIMULATION ENGINE — Dedicated Case Pages
   PNG-based source (ambulance) and observer, canvas wavefronts + grid
   ====================================================================== */
var PX_PER_CM = 20;
var WAVE_GAP_PX = 30;
var BASE_EMIT_MS = 300;
var SOUND_SPEED = 340;
var BASE_FREQ = 500;

var sim = {
  canvas:null, ctx:null, W:860, H:380, centerY:190,
  waves:[], anim:null, lastTS:null,
  source:{x:0,y:0,vx:0}, observer:{x:0,y:0,vx:0},
  caseId:1, isPaused:false, speedMult:1,
  waveSpeed: WAVE_GAP_PX / (BASE_EMIT_MS/1000),
  sourceDir:1, observerDir:1,
  imgLoaded:false,
  emitAccum:0
};

var simSourceImg, simObserverImg, simSourcePos, simObserverPos;

function simLayout(){
  var dpr = window.devicePixelRatio || 1;
  var vp = document.getElementById('simViewport');
  if(!vp) return;
  var vpW = vp.clientWidth, vpH = vp.clientHeight;
  var aspect = 860/380;
  var stageW, stageH;
  if(vpW / vpH > aspect){
    stageH = vpH; stageW = vpH * aspect;
  } else {
    stageW = vpW; stageH = vpW / aspect;
  }
  var stage = document.getElementById('simStage');
  if(stage){ stage.style.width = stageW+'px'; stage.style.height = stageH+'px'; }
  sim.canvas.width = Math.max(1, Math.round(stageW*dpr));
  sim.canvas.height = Math.max(1, Math.round(stageH*dpr));
  sim.ctx.setTransform(dpr,0,0,dpr,0,0);
  sim.W = stageW; sim.H = stageH; sim.centerY = stageH/2;
  sim.source.y = sim.centerY; sim.observer.y = sim.centerY;
}

function simSetPositions(n){
  var mid = sim.W/2;
  if(n===1){ sim.source.x=sim.W*0.3; sim.observer.x=sim.W*0.7; }
  else if([2,4,6].indexOf(n)!==-1){ sim.source.x=50; sim.observer.x=sim.W-50; }
  else if(n===7){ sim.source.x=mid-80; sim.observer.x=mid+80; }
  else if(n===8){ sim.source.x=mid-60; sim.observer.x=mid+40; }
  else if(n===9){ sim.source.x=mid+70; sim.observer.x=sim.source.x+7*PX_PER_CM; }
  else if(n===10){ sim.source.x=50; sim.observer.x=sim.W-50; }
  else { sim.source.x=mid-40; sim.observer.x=mid+40; }
}

function simSetVelocities(n){
  var v = 80;
  sim.source.vx = 0; sim.observer.vx = 0;
  if(n===2) sim.observer.vx = -v;
  else if(n===3) sim.observer.vx = v;
  else if(n===4) sim.source.vx = v;
  else if(n===5) sim.source.vx = -v;
  else if(n===6){ sim.source.vx=v; sim.observer.vx=-v; }
  else if(n===7){ sim.source.vx=-v; sim.observer.vx=v; }
  else if(n===8){ sim.source.vx=sim.observer.vx=v; }
  else if(n===9){ sim.source.vx=sim.observer.vx=-v; }
  else if(n===10){ sim.source.vx=sim.waveSpeed*1.5; sim.observer.vx=0; }
}

function simEmit(){
  if(sim.isPaused) return;
  sim.waves.push({x:sim.source.x, y:sim.source.y, r:0});
}
function simStartEmitter(){
  sim.emitAccum = 0;
  simEmit();
}
function simStopEmitter(){}

/* ============================= IMAGE LOADING ============================= */
function loadImages(cb){
  if(sim.imgLoaded){ if(cb) cb(); return; }
  simSourceImg = document.getElementById('simSourceImg');
  simObserverImg = document.getElementById('simObserverImg');
  simSourcePos = document.getElementById('simSourcePos');
  simObserverPos = document.getElementById('simObserverPos');
  var loaded=0, total=2;
  function onImgEvent(){
    loaded++;
    if(loaded>=total){ sim.imgLoaded=true; try{simLayout();}catch(e){} if(cb) cb(); }
  }
  [simSourceImg,simObserverImg].forEach(function(img){
    if(img.complete && img.naturalWidth>0) onImgEvent();
    else if(img.complete) onImgEvent();
    else{ img.addEventListener('load',onImgEvent); img.addEventListener('error',onImgEvent); }
  });
}

/* ============================= DIRECTION + POSITION ============================= */
var caseDirMap = {
  1:{s:1,o:1}, 2:{s:1,o:1}, 3:{s:1,o:-1},
  4:{s:1,o:1}, 5:{s:-1,o:1}, 6:{s:1,o:1},
  7:{s:-1,o:-1}, 8:{s:1,o:-1}, 9:{s:-1,o:1}, 10:{s:1,o:1}
};
function updateImageDirections(){
  var d = caseDirMap[sim.caseId];
  if(!d) return;
  if(d.s!==sim.sourceDir){ sim.sourceDir=d.s; simSourceImg.style.transform='scaleX('+d.s+')'; }
  if(d.o!==sim.observerDir){ sim.observerDir=d.o; simObserverImg.style.transform='scaleX('+d.o+')'; }
}

function syncImagePositions(){
  if(!simSourcePos||!simObserverPos||!simSourceImg||!simObserverImg) return;
  var vw = window.innerWidth;
  var srcW = Math.min(240, Math.max(75, vw * 0.1));
  var srcH = simSourceImg.naturalHeight ? srcW * simSourceImg.naturalHeight / simSourceImg.naturalWidth : simSourceImg.offsetHeight;
  var obsW = Math.min(200, Math.max(55, vw * 0.095));
  var obsH = simObserverImg.naturalHeight ? obsW * simObserverImg.naturalHeight / simObserverImg.naturalWidth : simObserverImg.offsetHeight;
  var sx = sim.source.x - srcW / 2;
  var sy = sim.source.y - srcH / 2;
  var ox = sim.observer.x - obsW / 2;
  var oy = sim.observer.y - obsH / 2;
  simSourcePos.style.transform = 'translate3d(' + sx + 'px,' + sy + 'px,0)';
  simObserverPos.style.transform = 'translate3d(' + ox + 'px,' + oy + 'px,0)';
}

/* ============================= DRAWING ============================= */
function simDraw(){
  var ctx = sim.ctx; var W=sim.W, H=sim.H;
  ctx.clearRect(0,0,W,H);

  ctx.strokeStyle="rgba(180,170,155,.25)"; ctx.lineWidth=1;
  for(var x=0;x<W;x+=40){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for(var y=0;y<H;y+=40){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  ctx.strokeStyle="#ccff00"; ctx.lineWidth=3;
  sim.waves.forEach(function(w){
    ctx.beginPath(); ctx.arc(w.x,w.y,w.r,0,Math.PI*2); ctx.stroke();
  });

  if(sim.imgLoaded){
    updateImageDirections();
    syncImagePositions();
  }else{
    ctx.fillStyle="#e2453c";
    ctx.beginPath(); ctx.arc(sim.source.x,sim.source.y,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#5B9CFF";
    ctx.beginPath(); ctx.arc(sim.observer.x,sim.observer.y,8,0,Math.PI*2); ctx.fill();
  }

  var fObs = computeObservedFreq();
  updateInfoPanel(fObs);
}

function computeObservedFreq(){
  if(sim.caseId === 10) return -1;
  var v = SOUND_SPEED;
  var dx = sim.observer.x - sim.source.x;
  var blend = Math.tanh(dx * 0.05);
  var vObsTerm = -blend * sim.observer.vx;
  var vSrcTerm = -blend * sim.source.vx;
  var denom = v + vSrcTerm;
  if(denom <= 0) return -1;
  return Math.round(BASE_FREQ * (v + vObsTerm) / denom);
}

function updateInfoPanel(fObs){
  var vs = Math.abs(sim.source.vx);
  var vo = Math.abs(sim.observer.vx);
  var elSrc = document.getElementById('infoSrcSpeed');
  var elObs = document.getElementById('infoObsSpeed');
  var elSound = document.getElementById('infoSoundSpeed');
  var elOrig = document.getElementById('infoOrigFreq');
  var elObsF = document.getElementById('infoObsFreq');
  var elShift = document.getElementById('infoShift');
  var elMach = document.getElementById('machCard');
  var elMachV = document.getElementById('infoMach');
  if(elSrc) elSrc.textContent = vs.toFixed(0);
  if(elObs) elObs.textContent = vo.toFixed(0);
  if(elSound) elSound.textContent = SOUND_SPEED;
  if(elOrig) elOrig.textContent = BASE_FREQ;
  var grid = document.querySelector('.sim-footer__grid');
  if(sim.caseId === 10){
    if(elMach) elMach.style.display = 'flex';
    if(elMachV) elMachV.textContent = (sim.source.vx / sim.waveSpeed).toFixed(2);
    if(elObsF){ elObsF.textContent = 'Shock'; elObsF.style.color = '#FF6B5E'; }
    if(elShift){ elShift.textContent = 'Front'; elShift.style.color = '#FF6B5E'; }
    if(grid) grid.style.gridTemplateColumns = 'repeat(7,1fr)';
    return;
  }
  if(elMach) elMach.style.display = 'none';
  if(grid) grid.style.gridTemplateColumns = '';
  if(elObsF){ elObsF.textContent = fObs > 0 ? fObs : '\u2014'; elObsF.style.color = ''; }
  if(fObs > 0){
    var fShift = fObs - BASE_FREQ;
    if(elShift){
      elShift.textContent = (fShift >= 0 ? '+' : '') + fShift;
      elShift.style.color = fShift > 0 ? '#4ade80' : (fShift < 0 ? '#FF6B5E' : '');
    }
  }else{
    if(elShift){ elShift.textContent = '\u2014'; elShift.style.color = ''; }
  }
}

function simUpdate(dt){
  sim.source.x += sim.source.vx*dt;
  sim.observer.x += sim.observer.vx*dt;
  sim.emitAccum += dt;
  var emitInterval = BASE_EMIT_MS / 1000;
  while(sim.emitAccum >= emitInterval){
    sim.emitAccum -= emitInterval;
    if(!sim.isPaused) sim.waves.push({x:sim.source.x, y:sim.source.y, r:0});
  }
  sim.waves.forEach(function(w){ w.r += sim.waveSpeed*dt; });
  if(sim.source.x<0 || sim.source.x>sim.W || sim.observer.x<0 || sim.observer.x>sim.W){
    sim.waves = []; sim.emitAccum = 0;
    simSetPositions(sim.caseId); simSetVelocities(sim.caseId);
    simDraw(); simEmit();
  }
}

function simLoop(ts){
  if(!sim.lastTS) sim.lastTS = ts;
  var dt = (ts-sim.lastTS)/1000; sim.lastTS = ts;
  if(!sim.isPaused){
    simUpdate(dt*sim.speedMult);
    simDraw();
  }
  sim.anim = requestAnimationFrame(simLoop);
}

function startSimulation(n){
  sim.caseId = n;
  simLayout();
  sim.waves = []; sim.lastTS = null; sim.emitAccum = 0;
  sim.isPaused = false;
  simSetPositions(n); simSetVelocities(n);
  simDraw(); simEmit();
  if(!sim.anim) sim.anim = requestAnimationFrame(simLoop);
  var label = document.getElementById('playLabel');
  if(label) label.textContent = 'Pause';
  var btn = document.getElementById('playBtn');
  if(btn){
    btn.classList.remove('paused');
    var svg = btn.querySelector('svg');
    if(svg) svg.innerHTML = '<rect x="0" y="0" width="6" height="20" rx="1"/><rect x="11" y="0" width="6" height="20" rx="1"/>';
  }
}

function toggleSimPause(){
  sim.isPaused = !sim.isPaused;
  var btn = document.getElementById('playBtn');
  var label = document.getElementById('playLabel');
  var svg = btn.querySelector('svg');
  if(sim.isPaused){
    label.textContent = 'Play';
    btn.classList.add('paused');
    svg.innerHTML = '<polygon points="0,0 20,10 0,20"/>';
  }else{
    label.textContent = 'Pause';
    btn.classList.remove('paused');
    svg.innerHTML = '<rect x="0" y="0" width="6" height="20" rx="1"/><rect x="11" y="0" width="6" height="20" rx="1"/>';
  }
}

function resetSimulation(){
  sim.waves = []; sim.lastTS = null; sim.emitAccum = 0;
  sim.isPaused = false;
  simSetPositions(sim.caseId); simSetVelocities(sim.caseId);
  simDraw(); simEmit();
  var label = document.getElementById('playLabel');
  if(label) label.textContent = 'Pause';
  var btn = document.getElementById('playBtn');
  if(btn){
    btn.classList.remove('paused');
    var svg = btn.querySelector('svg');
    if(svg) svg.innerHTML = '<rect x="0" y="0" width="6" height="20" rx="1"/><rect x="11" y="0" width="6" height="20" rx="1"/>';
  }
}

var SPEED_VALUES = [0.25,0.5,0.75,1,1.25,1.5,1.75,2];

function setSimSpeed(idx){
  var val = SPEED_VALUES[parseInt(idx)] || 1;
  sim.speedMult = val;
  document.getElementById('speedDisplay').textContent = val.toFixed(2).replace(/\.?0+$/,'')+'\u00D7';
}

function simOnResize(){
  if(sim.canvas){ simLayout(); }
}
var simResizeTimer;
window.addEventListener('resize',function(){
  clearTimeout(simResizeTimer);
  simResizeTimer = setTimeout(simOnResize, 120);
});

function initSimulation(canvasId, caseNumber){
  sim.canvas = document.getElementById(canvasId);
  sim.ctx = sim.canvas.getContext('2d');
  simStopEmitter();
  if(sim.anim){ cancelAnimationFrame(sim.anim); sim.anim = null; }

  document.getElementById('fsBtn').addEventListener('click',toggleFullscreen);

  var speedRange = document.getElementById('speedRange');
  if(speedRange){
    speedRange.addEventListener('input',function(){ setSimSpeed(this.value); });
  }
  var speedDec = document.getElementById('speedDec');
  if(speedDec){
    speedDec.addEventListener('click',function(){
      var r = document.getElementById('speedRange');
      if(!r) return;
      var v = Math.max(0, parseInt(r.value) - 1);
      r.value = v; setSimSpeed(v);
    });
  }
  var speedInc = document.getElementById('speedInc');
  if(speedInc){
    speedInc.addEventListener('click',function(){
      var r = document.getElementById('speedRange');
      if(!r) return;
      var v = Math.min(7, parseInt(r.value) + 1);
      r.value = v; setSimSpeed(v);
    });
  }

  loadImages(function(){ startSimulation(caseNumber); });
}

function toggleFullscreen(){
  var panel=document.querySelector('.sim-panel');
  var btn = document.getElementById('fsBtn');
  if(!document.fullscreenElement && !document.webkitFullscreenElement){
    if(panel.requestFullscreen) panel.requestFullscreen();
    else if(panel.webkitRequestFullscreen) panel.webkitRequestFullscreen();
    panel.classList.add('fullscreen');
    if(btn) btn.classList.add('active');
  }else{
    if(document.exitFullscreen) document.exitFullscreen();
    else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
    panel.classList.remove('fullscreen');
    if(btn) btn.classList.remove('active');
  }
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ simOnResize(); }); });
}
function onFullscreenChange(){
  var isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
  document.querySelector('.sim-panel').classList.toggle('fullscreen', isFs);
  var b = document.getElementById('fsBtn');
  if(b) b.classList.toggle('active', isFs);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ simOnResize(); }); });
}
document.addEventListener('fullscreenchange', onFullscreenChange);
document.addEventListener('webkitfullscreenchange', onFullscreenChange);
