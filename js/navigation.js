/* ======================================================================
   RESPONSIVE NAVIGATION (hamburger menu — mobile & tablet only)
   Desktop navigation is untouched; the toggle button is hidden there.
   ====================================================================== */
(function(){
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('navMenu');
  if(!toggle || !nav) return;

  function close(){
    toggle.classList.remove('open');
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }

  function open(){
    nav.classList.remove('nav-hidden');
    toggle.classList.add('open');
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded','true');
  }

  toggle.addEventListener('click', function(e){
    e.stopPropagation();
    if(nav.classList.contains('open')){ close(); }
    else { open(); }
  });

  /* tapping any menu item closes the menu */
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', close);
  });

  /* tapping outside the menu closes it */
  document.addEventListener('click', function(e){
    if(!nav.classList.contains('open')) return;
    if(nav.contains(e.target) || toggle.contains(e.target)) return;
    close();
  });

  /* Escape key closes it */
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') close();
  });

  /* keep an open menu visible while scrolling */
  window.addEventListener('scroll', function(){
    if(nav.classList.contains('open')) nav.classList.remove('nav-hidden');
  });
})();
