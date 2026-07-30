/* ======================================================================
   FLOATING PARTICLES (decorative)
   ====================================================================== */
(function(){
  var layer = document.getElementById('particleLayer');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!layer || reduced) return;
  var n = window.innerWidth < 700 ? 12 : 26;
  for(var i=0;i<n;i++){
    var p = document.createElement('span');
    p.className = 'particle';
    var size = 2 + Math.random()*4;
    p.style.width = p.style.height = size+'px';
    p.style.left = Math.random()*100+'%';
    p.style.top = Math.random()*100+'%';
    p.style.animationDuration = (10+Math.random()*14)+'s';
    p.style.animationDelay = (Math.random()*10)+'s';
    p.style.opacity = 0.25+Math.random()*0.4;
    layer.appendChild(p);
  }
})();

/* ======================================================================
   HERO AMBIENT WAVE ANIMATION (decorative, independent of the main sim)
   ====================================================================== */
(function(){
  var c = document.getElementById('heroCanvas');
  if(!c) return;
  var ctx = c.getContext('2d');
  var w=0,h=0,dpr=1;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function size(){
    dpr = window.devicePixelRatio || 1;
    w = c.clientWidth; h = c.clientHeight;
    c.width = Math.max(1,w*dpr); c.height = Math.max(1,h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', size);
  size();

  var sx = w*0.2, dir=1, last=null, rings=[];
  function frame(ts){
    if(!last) last = ts;
    var dt = Math.min(48, ts-last); last = ts;
    if(!reduced){
      sx += dir*0.028*dt;
      if(sx > w*0.82 || sx < w*0.12) dir *= -1;
      if(Math.random() < 0.045) rings.push({x:sx, r:0});
      rings.forEach(function(r){ r.r += 0.085*dt; });
      rings = rings.filter(function(r){ return r.r < Math.max(w,h)*0.55; });
    }
    ctx.clearRect(0,0,w,h);
    ctx.lineWidth = 1.4;
    rings.forEach(function(r){
      ctx.strokeStyle = 'rgba(110,140,255,' + Math.max(0,0.28 - r.r/900) + ')';
      ctx.beginPath(); ctx.arc(r.x, h*0.52, r.r, 0, Math.PI*2); ctx.stroke();
    });
    ctx.fillStyle = 'rgba(178,121,255,.75)';
    ctx.beginPath(); ctx.arc(sx, h*0.52, 4.5, 0, Math.PI*2); ctx.fill();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
