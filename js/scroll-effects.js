/* ======================================================================
     SCROLL REVEAL
     ====================================================================== */
(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if(reduced){ els.forEach(function(e){e.classList.add('in');}); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  },{threshold:.12});
  els.forEach(function(el){ io.observe(el); });
})();

/* ======================================================================
     NAV BUTTONS SHOW/HIDE ON SCROLL
     ====================================================================== */
(function(){
  var nav = document.querySelector('.nav-buttons');
  var toggle = document.querySelector('.nav-toggle');
  if(!nav) return;
  var lastY = window.scrollY;
  var ticking = false;
  window.addEventListener('scroll',function(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      var y = window.scrollY;
      var isOpen = nav.classList.contains('open');
      if(y > 50){
        if(y > lastY){
          if(!isOpen){
            nav.classList.add('nav-hidden');
            if(toggle) toggle.classList.add('nav-hidden');
          }
        } else {
          nav.classList.remove('nav-hidden');
          if(toggle) toggle.classList.remove('nav-hidden');
        }
      } else {
        nav.classList.remove('nav-hidden');
        if(toggle) toggle.classList.remove('nav-hidden');
      }
      lastY = y;
      ticking = false;
    });
  });
})();

/* ======================================================================
     FLOATING BACK-TO-TOP
     ====================================================================== */
