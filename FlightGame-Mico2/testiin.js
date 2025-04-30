'use strict'
const shopButt=document.getElementById("shopButton");
const modal=document.getElementById("shopModal");

  window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display="none";
  }
shopButt.onclick= function(){
  let script= document.createElement('script');
  script.src="shop.js";
  document.head.appendChild(script);
  modal.style.display="flex";
};
}