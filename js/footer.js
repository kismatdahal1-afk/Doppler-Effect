/* ======================================================================
   FOOTER — GitHub link is shown for UI only (repo is private).
   Clicking it shows a "private repo" toast instead of navigating.
   ====================================================================== */
(function(){
  var link = document.getElementById('footerGithubLink');
  if(!link) return;

  function showToast(){
    var toast = document.getElementById('footerToast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'footerToast';
      toast.className = 'footer-toast';
      toast.setAttribute('role', 'status');
      toast.textContent = 'Sorry, it\u2019s a private repo.';
      document.body.appendChild(toast);
    }
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){
      toast.classList.remove('show');
    }, 2600);
  }

  link.addEventListener('click', function(e){
    e.preventDefault();
    showToast();
  });
})();
