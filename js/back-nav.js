/* ======================================================================
   BACK NAVIGATION — seamless return to the previous section & scroll
   position on the home page. No reload, no jump to the hero, no smooth
   scroll from the top.

   Home page: saves the scroll position before leaving for any detail
   page, then instantly restores it on return (fresh load or bfcache).
   Detail pages: uses history.back() to return to the home page
   natively, restoring the previous scroll position instantly via bfcache.
   ====================================================================== */

/* Prevent browser from auto-restoring scroll position on ANY page load */
history.scrollRestoration = 'manual';

(function(){
  if(!('sessionStorage' in window)) return;
  var KEY = 'doppler-home-scroll';

  function isHome(){
    var p = location.pathname;
    if(/\/(cases|applications|limitations)(\/|$)/.test(p)) return false;
    return /(^|\/)index\.html?$/i.test(p) || /\/$/.test(p);
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

  /* ============================= DETAIL PAGES ============================= */
  if(!isHome()){
    /* Force scroll to TOP immediately and prevent any browser scroll restoration */
    history.scrollRestoration = 'manual';

    /* Disable smooth scroll from app.css — inline override */
    document.documentElement.style.scrollBehavior = 'auto';

    /* Force scroll to top — run now and keep enforcing until page is ready */
    function forceTop(){
      window.scrollTo(0, 0);
    }
    forceTop();
    if(document.readyState === 'loading'){
      var _check = setInterval(forceTop, 10);
      document.addEventListener('DOMContentLoaded', function(){
        clearInterval(_check);
        forceTop();
        window.removeEventListener('scroll', forceTop);
      }, {once: true});
      window.addEventListener('scroll', forceTop);
    } else {
      forceTop();
    }

    /* Restore smooth scroll after initial paint */
    window.addEventListener('load', function(){
      setTimeout(function(){
        document.documentElement.style.scrollBehavior = '';
      }, 100);
    });

    /* Intercept ALL back links (top nav + bottom nav) in capture phase */
    document.addEventListener('click', function(e){
      if(e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var a = e.target.closest('a[href]');
      if(!a || a.target || a.hasAttribute('download')) return;
      var href = a.getAttribute('href') || '';
      if(href.indexOf('#') < 0 || !/index\.html/.test(href)) return;

      e.preventDefault();

      /* Try native back first (bfcache-aware, instant if available) */
      try {
        history.back();
      } catch(err) {
        /* Fallback: navigate to home WITHOUT hash to avoid scroll animation */
        var cleanHref = href.replace(/#.*$/, '');
        window.location.href = cleanHref;
      }
    }, true);

    return;
  }

  /* ============================= HOME PAGE ============================= */
  function save(){
    sessionStorage.setItem(KEY, JSON.stringify({ y: window.scrollY }));
  }

  function restore(){
    var raw = sessionStorage.getItem(KEY);
    if(!raw) return;
    var y = null;
    try{
      var d = JSON.parse(raw);
      y = (d && typeof d.y === 'number') ? d.y : null;
    }catch(e){ return; }
    if(y === null) return;
    if(document.readyState === 'loading') return;
    sessionStorage.removeItem(KEY);
    var root = document.documentElement;
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, y);
    root.style.scrollBehavior = prev;
    if(location.hash){
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  function saveIfDetailLink(e){
    if(e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    var t = e.target;
    if(!(t instanceof Element)) return;
    if(t.closest('.explore-card, .app-card, .lim-card')){ save(); return; }
    var a = t.closest('a[href]');
    if(a && !a.target && /cases\/case-\d+\.html|applications\/|limitations\//.test(a.getAttribute('href') || '')){
      save();
    }
  }

  document.addEventListener('click', saveIfDetailLink, true);

  restore();
  document.addEventListener('DOMContentLoaded', restore);
  window.addEventListener('load', restore);
  window.addEventListener('pageshow', function(){ restore(); });
})();