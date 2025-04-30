'use strict'
import {Shop} from './shop.js';
const shopButt=document.getElementById("shopButton");
const modal=document.getElementById("shopModal");
const instance= new Shop();
  window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display="none";
  }
shopButt.onclick= function(){
    modal.style.display="flex";
  instance.createShop();
};
}