(() => {
  "use strict";
  const dot=document.querySelector(".cursor-dot");
  if(dot && window.matchMedia("(pointer:fine)").matches){
    window.addEventListener("pointermove",e=>{dot.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`},{passive:true});
  }
})();