/* ======================================================================
   BUILD CASE SELECTOR CARDS + NAVIGATE TO DEDICATED CASE PAGES
   ====================================================================== */
var caseGridEl = document.getElementById('caseGrid');
var BADGE_COLORS = {
  1:'#5B9CFF',2:'#2BE8C9',3:'#9B7BFF',4:'#FF6B5E',5:'#4ADE80',
  6:'#22D3EE',7:'#C77DFF',8:'#FFC15E',9:'#A3E635',10:'#FF7DC7'
};
function arrowSvg(dir){
  if(dir==='→') return '<svg viewBox="0 0 18 10" width="16" height="10"><line x1="2" y1="5" x2="11" y2="5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><polygon points="11,2 17,5 11,8" fill="currentColor"/></svg>';
  if(dir==='←') return '<svg viewBox="0 0 18 10" width="16" height="10"><line x1="16" y1="5" x2="7" y2="5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><polygon points="7,2 1,5 7,8" fill="currentColor"/></svg>';
  if(dir==='»') return '<svg viewBox="0 0 24 10" width="20" height="10"><line x1="2" y1="5" x2="7" y2="5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><polygon points="7,2 12,5 7,8" fill="currentColor"/><line x1="14" y1="5" x2="19" y2="5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><polygon points="19,2 22,5 19,8" fill="currentColor"/></svg>';
  return '';
}
function srcIcon(){
  return '<svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="6.5" fill="#e2453c"/><circle cx="10" cy="10" r="10" fill="none" stroke="#e2453c" stroke-width="1.5" opacity=".3"/></svg>';
}
function obsIcon(){
  return '<svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="7" r="3.5" fill="#5B9CFF"/><path d="M3 18c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="none" stroke="#5B9CFF" stroke-width="1.6" stroke-linecap="round"/></svg>';
}
function motionBarHTML(glyph){
  function fnd(t){for(var i=0;i<glyph.length;i++){if(glyph[i].t===t)return glyph[i];}return null;}
  var src=fnd('s'), obs=fnd('o'), sa=arrowSvg(src?src.a:''), oa=arrowSvg(obs?obs.a:'');
  return '<div class="motion-bar">'+
    '<div class="motion-bar__item">'+
      '<span class="motion-bar__icon motion-bar__icon--src">'+srcIcon()+'</span>'+
      (sa?'<span class="motion-bar__arrow">'+sa+'</span>':'')+
    '</div>'+
    '<div class="motion-bar__divider"></div>'+
    '<div class="motion-bar__item">'+
      '<span class="motion-bar__icon motion-bar__icon--obs">'+obsIcon()+'</span>'+
      (oa?'<span class="motion-bar__arrow">'+oa+'</span>':'')+
    '</div>'+
  '</div>';
}
var gridHTML='';
Object.keys(CASES).forEach(function(id){
  var c=CASES[id];
  var badge=String(Number(id)).padStart(2,'0');
  var CASE_IMGS={
    1:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600007/case1_xjsgri.png',
    2:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600010/case2_j1vv7n.png',
    3:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600013/case3_rjarqe.png',
    4:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600015/case4_ohapmq.png',
    5:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600018/case5_nodcso.png',
    6:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600020/case6_btooxs.png',
    7:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600023/case7_gvj2nq.png',
    8:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600026/case8_e2lvnt.png',
    9:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600028/case9_zmpvkm.png',
    10:'https://res.cloudinary.com/gsrayf9e/image/upload/v1785600354/case10_hgr4ja.png'
  };
  var bg=CASE_IMGS[id];
  var bc=BADGE_COLORS[id]||'#5B9CFF';
  gridHTML+='<button class="explore-card" data-case="'+id+'" style="--card-accent:'+c.color+';--badge-color:'+bc+'">'+
    '<div class="explore-card__img"><img src="'+bg+'" alt="" loading="lazy"></div>'+
    '<span class="explore-card__badge">'+badge+'</span>'+
    '<div class="explore-card__body">'+
      '<div class="explore-card__title">'+c.line1+(c.line2?'<span>'+c.line2+'</span>':'')+'</div>'+
    '</div>'+
    '<div class="explore-card__footer">'+motionBarHTML(c.glyph)+
      '<span class="card-view" aria-hidden="true">View <span class="card-view__arrow">\u2192</span></span></div>'+
  '</button>';
});
caseGridEl.innerHTML=gridHTML;

(function(){
  var cards=document.querySelectorAll('.explore-card');
  cards.forEach(function(c,i){ setTimeout(function(){ c.classList.add('in'); }, i*60+150); });
})();

caseGridEl.addEventListener('click',function(e){
  var btn=e.target.closest('.explore-card');
  if(!btn) return;
  var id=String(Number(btn.dataset.case)).padStart(2,'0');
  window.location='cases/case-'+id+'.html';
});
