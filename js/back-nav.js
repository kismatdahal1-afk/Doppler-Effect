/* ======================================================================
   BACK NAVIGATION — seamless return to the previous section & scroll
   position on the home page. No reload, no jump to the hero, no smooth
   scroll from the top.

   Home page: saves the scroll position before leaving for any detail
   page, then instantly restores it on return (fresh load or bfcache).
   Detail pages: strips the "#section" fragment from back links so the
   browser never re-scrolls to an anchor after returning home.
   ====================================================================== */
(function(){
  if(!('sessionStorage' in window)) return;
  var KEY = 'doppler-home-scroll';

  function isHome(){
    var p = location.pathname;
    return /index\.html?$/i.test(p) || /\/$/.test(p);
  }

  function readSaved(){
    var raw = sessionStorage.getItem(KEY);
    if(!raw) return null;
    try{
      var d = JSON.parse(raw);
      return (d && typeof d.y === 'number') ? d.y : null;
    }catch(e){ return null; }
  }

  function isModified(e){
    return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
  }

  /* ============================= HOME PAGE ============================= */
  if(isHome()){
    var savedY = null;

    function save(){
      sessionStorage.setItem(KEY, JSON.stringify({ y: window.scrollY }));
    }

    function restore(){
      if(savedY === null){
        savedY = readSaved();
        if(savedY === null) return;
        sessionStorage.removeItem(KEY);
        history.scrollRestoration = 'manual';
      }
      var root = document.documentElement;
      var prev = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, savedY);
      root.style.scrollBehavior = prev;
      if(location.hash){
        history.replaceState(null, '', location.pathname + location.search);
      }
    }

    document.addEventListener('click', function(e){
      if(e.defaultPrevented || isModified(e)) return;
      var t = e.target;
      if(!(t instanceof Element)) return;
      if(t.closest('.explore-card, .app-card, .lim-card')){ save(); return; }
      var a = t.closest('a[href]');
      if(a && !a.target && /cases\/case-\d+\.html|applications\/|limitations\//.test(a.getAttribute('href') || '')){
        save();
      }
    }, true);

    restore();
    document.addEventListener('DOMContentLoaded', restore);
    window.addEventListener('load', restore);
    window.addEventListener('pageshow', function(){ restore(); });
    return;
  }

  /* ============================= DETAIL PAGES ============================= */
  document.addEventListener('click', function(e){
    if(e.defaultPrevented || isModified(e)) return;
    var a = e.target.closest('a[href]');
    if(!a || a.target || a.hasAttribute('download')) return;
    var href = a.getAttribute('href') || '';
    if(href.indexOf('#') < 0 || !/index\.html/.test(href)) return;
    if(!sessionStorage.getItem(KEY)) return;
    e.preventDefault();
    window.location.href = href.replace(/#.*$/, '');
  });
})();
