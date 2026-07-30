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
   FLOATING BACK-TO-TOP
   ====================================================================== */
var floatTop = document.getElementById('floatTop');
window.addEventListener('scroll', function(){
  floatTop.classList.toggle('visible', window.scrollY > 700);
});

/* ======================================================================
   AUTO-HIDE NAV
   ====================================================================== */
var lastScroll = 0;
var navEl = document.querySelector('.nav');
window.addEventListener('scroll', function(){
  var curr = window.scrollY;
  if(curr > lastScroll && curr > 80){
    navEl.classList.add('hidden');
  } else {
    navEl.classList.remove('hidden');
  }
  lastScroll = curr;
});
