/* ======================================================================
   APPLICATION DETAIL PAGES — slug-based renderer
   Reads APPLICATION_DETAILS[APP_SLUG] from js/applications-data.js,
   renders the hero and all sections, wires prev/next navigation and
   KaTeX rendering. Static presentation (no entrance animations).
   ====================================================================== */
(function(){
  var slug = typeof APP_SLUG !== 'undefined' ? APP_SLUG : '';
  if(typeof APPLICATION_DETAILS === 'undefined') return;
  var data = APPLICATION_DETAILS[slug];
  if(!data) return;

  var idx = -1;
  APPLICATIONS.forEach(function(a,i){ if(a.slug === slug) idx = i; });
  var prev = idx > 0 ? APPLICATIONS[idx-1] : null;
  var next = (idx >= 0 && idx < APPLICATIONS.length-1) ? APPLICATIONS[idx+1] : null;
  function linkFor(a){ return a ? '../'+a.slug+'/' : '#'; }

  /* ---- top navigation ---- */
  var el;
  el = document.getElementById('navBadge');  if(el) el.textContent = data.num;
  el = document.getElementById('navTitle');  if(el) el.textContent = data.title;
  el = document.getElementById('prevBtn');
  if(el){ if(prev){ el.href = linkFor(prev); } else { el.classList.add('disabled'); el.removeAttribute('href'); } }
  el = document.getElementById('nextBtn');
  if(el){ if(next){ el.href = linkFor(next); } else { el.classList.add('disabled'); el.removeAttribute('href'); } }

  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft'  && prev) window.location = linkFor(prev);
    if(e.key === 'ArrowRight' && next) window.location = linkFor(next);
  });

  /* ---- accent + hero ---- */
  var main = document.getElementById('appMain');
  if(main) main.style.setProperty('--app-accent', data.accent);
  el = document.getElementById('heroEyebrow'); if(el) el.textContent = data.subtitle;
  el = document.getElementById('heroTitle');   if(el) el.textContent = data.title;
  el = document.getElementById('heroDesc');    if(el) el.textContent = data.heroDescription;
  el = document.getElementById('heroNum');     if(el) el.textContent = data.num;
  el = document.getElementById('heroImg');
  if(el){ el.src = data.image; el.alt = data.title; }

  /* ---- bottom navigation ---- */
  el = document.getElementById('bottomPrev');
  if(el){ if(prev){ el.href = linkFor(prev); } else { el.classList.add('disabled'); el.removeAttribute('href'); } }
  el = document.getElementById('bottomNext');
  if(el){ if(next){ el.href = linkFor(next); } else { el.classList.add('disabled'); el.removeAttribute('href'); } }

  /* ---- sections (single glass container) ---- */
  var wrap = document.getElementById('appContent');
  if(wrap) wrap.innerHTML = '<div class="app-glass">'+buildSections(data)+'</div>';

  function buildSections(d){
    var html = '';
    d.sections.forEach(function(sec){
      html += '<section class="app-section"><h2>'+sec.title+'</h2>';
      sec.blocks.forEach(function(b){ html += buildBlock(b); });
      html += '</section>';
    });
    return html;
  }

  function buildBlock(b){
    switch(b.type){
      case 'overview':
        return '<div class="overview-grid overview-grid--3">'+
          b.items.map(function(i){
            return '<div class="overview-item"><span class="overview-label">'+i[0]+'</span><b>'+i[1]+'</b></div>';
          }).join('')+
        '</div>';
      case 'p':
        return b.text.map(function(t){ return '<p>'+t+'</p>'; }).join('');
      case 'ul':
        return '<ul>'+b.items.map(function(i){ return '<li>'+i+'</li>'; }).join('')+'</ul>';
      case 'ol':
        return '<ol>'+b.items.map(function(i){ return '<li>'+i+'</li>'; }).join('')+'</ol>';
      case 'formula':
        return '<div class="formula-row">'+
          b.cards.map(function(c){
            return '<div class="formula-card"><p class="formula-label">'+c.label+'</p>'+
              '<div class="formula-display" data-tex="'+c.tex+'">'+c.fallback+'</div></div>';
          }).join('')+
        '</div>';
      case 'vars':
        return '<div class="vars">'+
          b.items.map(function(v){
            return '<div class="vars-row"><span class="vars-symbol" data-tex="'+v.tex+'">'+v.fallback+'</span>'+
              '<span class="vars-def">'+v.def+'</span></div>';
          }).join('')+
        '</div>';
      case 'fact':
        return '<div class="fact-card">'+
          '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3.5"/></svg>'+
          '<p>'+b.text+'</p></div>';
      case 'summary':
        return '<div class="summary-box"><p>'+b.text+'</p></div>';
      default:
        return '';
    }
  }

  /* ---- KaTeX rendering (formulas + variable symbols) ---- */
  function renderMath(){
    if(typeof katex === 'undefined') return;
    document.querySelectorAll('[data-tex]').forEach(function(el){
      var tex = el.getAttribute('data-tex');
      if(!tex) return;
      try {
        katex.render(tex, el, { displayMode: el.classList.contains('formula-display'), throwOnError:false });
      }catch(e){ /* keep fallback text */ }
    });
  }
  if(typeof katex !== 'undefined') renderMath();
  else window.addEventListener('load', renderMath);
})();
