/* ======================================================================
   EXPERIENCE VIDEO — watermark play/pause overlay
   Center button toggles the video; native controls remain untouched.
   ====================================================================== */
(function(){
  var wrap = document.querySelector('.experience__video');
  if(!wrap) return;
  var video = wrap.querySelector('video');
  var btn = document.getElementById('experiencePlayBtn');
  if(!video || !btn) return;

  function setIcon(){
    btn.classList.toggle('is-playing', !video.paused);
    btn.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video');
  }

  btn.addEventListener('click', function(e){
    e.preventDefault();
    if(video.paused){
      var p = video.play();
      if(p && p.catch) p.catch(function(){});
    } else {
      video.pause();
    }
  });

  video.addEventListener('play', setIcon);
  video.addEventListener('pause', setIcon);
  setIcon();
})();
