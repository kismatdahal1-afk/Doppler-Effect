/* ======================================================================
   MOBILE BOTTOM SHEET — Simulation panel (max-width:768px only)
   Touch-drag expand/collapse. Inert on desktop/tablet.
   ====================================================================== */
(function(){
  var mq = window.matchMedia('(max-width:768px)');
  var panel = document.querySelector('.sim-panel');
  if(!panel) return;

  var OPEN = 0, COLLAPSED = 0.8, SNAP = 0.4, EDGE = 6;
  var dragging = false, moved = false;
  var startY = 0, baseT = COLLAPSED, curT = COLLAPSED;
  var lastY = 0, lastTS = 0, snapTimer = null;

  function isOpen(){ return panel.classList.contains('open'); }

  function setPos(t){
    curT = Math.max(OPEN, Math.min(COLLAPSED, t));
    panel.style.transition = 'none';
    panel.style.transform = 'translateY(' + (curT * 100) + '%)';
    panel.classList.toggle('open', curT <= SNAP);
  }

  function snapTo(t){
    clearTimeout(snapTimer);
    t = t <= SNAP ? OPEN : COLLAPSED;
    panel.style.transition = 'transform .45s cubic-bezier(.22,.61,.36,1)';
    panel.style.transform = 'translateY(' + (t * 100) + '%)';
    panel.classList.toggle('open', t === OPEN);
    curT = t;
    snapTimer = setTimeout(function(){
      panel.style.transition = '';
      panel.style.transform = '';
      panel.classList.toggle('open', curT === OPEN);
    }, 460);
  }

  function onStart(e){
    if(!mq.matches) return;
    if(panel.classList.contains('fullscreen')) return;
    var el = e.target;
    if(!el || el.closest('.sim-footer') || el.closest('button')) return;
    dragging = true; moved = false;
    startY = e.touches[0].clientY;
    baseT = isOpen() ? OPEN : COLLAPSED;
    lastY = startY; lastTS = Date.now();
  }

  function onMove(e){
    if(!dragging) return;
    var y = e.touches[0].clientY;
    var dy = y - startY;
    if(Math.abs(dy) > EDGE) moved = true;
    if(moved) e.preventDefault();
    setPos(baseT + dy / window.innerHeight);
    lastY = y; lastTS = Date.now();
  }

  function onEnd(e){
    if(!dragging) return;
    dragging = false;
    var y = e.changedTouches ? e.changedTouches[0].clientY : lastY;
    if(!moved){
      if(!isOpen()) snapTo(OPEN);
      return;
    }
    var dt = Date.now() - lastTS;
    var vy = dt > 0 ? (lastY - y) / dt : 0;
    var target = Math.abs(vy) > 0.5 ? (vy > 0 ? OPEN : COLLAPSED) : (curT < SNAP ? OPEN : COLLAPSED);
    snapTo(target);
  }

  function onCancel(){
    if(!dragging) return;
    dragging = false;
    snapTo(curT < SNAP ? OPEN : COLLAPSED);
  }

  function onMqChange(){
    clearTimeout(snapTimer);
    dragging = false; moved = false;
    panel.style.transition = '';
    panel.style.transform = '';
    panel.classList.remove('open');
    curT = COLLAPSED;
  }

  panel.addEventListener('touchstart', onStart, {passive:true});
  window.addEventListener('touchmove', onMove, {passive:false});
  window.addEventListener('touchend', onEnd, {passive:true});
  window.addEventListener('touchcancel', onCancel, {passive:true});
  if(mq.addEventListener) mq.addEventListener('change', onMqChange);
  else if(mq.addListener) mq.addListener(onMqChange);
})();
