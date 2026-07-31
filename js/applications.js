/* ======================================================================
   APPLICATIONS & EXAMPLES — COMPACT TILE RENDERER
   Renders the APPLICATIONS index (from applications-data.js) as compact
   navigation tiles: image + number badge + title. No animations, no
   runtime fetch — data is written in code.
   ====================================================================== */
(function(){
  var grid = document.getElementById('appGrid');
  if(!grid) return;

  var html = '';
  APPLICATIONS.forEach(function(a){
    html += '<a class="app-card" href="applications/'+a.slug+'/" style="--app-accent:'+a.accent+'" aria-label="'+a.title+'">'+
      '<img class="app-card__img" src="'+a.image+'" alt="'+a.title+'" loading="lazy">'+
      '<span class="app-card__shade"></span>'+
      '<span class="app-card__num">'+a.num+'</span>'+
      '<span class="app-card__title">'+a.title+'</span>'+
    '</a>';
  });
  grid.innerHTML = html;
})();
