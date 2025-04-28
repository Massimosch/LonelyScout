'use strict'
let shopInventory= {
    weapons:[{name:"a1", type:"kakka", sale_value:140, damage:"10",durability:"100"},
  {name:"a2", type:"kakka", sale_value:140, damage:"10",durability:"100"},
{name:"a3", type:"kakka", sale_value:140, damage:"10",durability:"100"}]
};
let playerInventory={
    weapons:[{name:"a1", type:"kakka", sale_value:140, damage:"10",durability:"100"},
  {name:"a2", type:"kakka", sale_value:140, damage:"10",durability:"100"},
{name:"a3", type:"kakka", sale_value:140, damage:"10",durability:"100"}]
};
let gold=100;
const goldText=document.getElementById("goldText");
const articleInfoArray={weapon:{h:"Aseet: "},consumable:{h:"Käyttötavarat: "}};
let tradeArray={sell:[],buy:[]};
const shopBox= document.getElementById("shopInventory");
const playerBox=document.getElementById("playerInventory");
const tradeWindow= document.getElementById("tradeWindow");
async function getData(){

}
function createShop()
{
  printInventory(shopInventory,shopBox);
  printInventory(playerInventory, playerBox);
  goldText.innerText=`Gold: ${gold}`
}
function printInventory(inventory,box)
{
  let itemContainer = document.createElement('div');
  let wepH=document.createElement('h2');
  let consH=document.createElement('h2');
  wepH.innerText="aseet";
  consH.innerText="käyttötavarat";
  itemContainer.appendChild(wepH);
  for (let item of inventory['weapons']){
    let p=document.createElement('p');
    p.innerText=item.name;
    let button= document.createElement('button');
    button.innerText="asdf";
    itemContainer.appendChild(button);
    itemContainer.appendChild(p);
    let thing=[button,p];

  button.addEventListener("click",function(){
    let addToTrade=false;
      for (let i of thing){
        if (tradeWindow.contains(i)){
          itemContainer.appendChild(i);
        }
        else{
          addToTrade=true;
          tradeWindow.appendChild(i);
        }
      }
      if (addToTrade)
      {
          if (inventory===shopInventory)
          {
            gold-=item.sale_value;
            tradeArray['buy'].push(item);
          }
          else{
            gold+=item.sale_value;
            tradeArray['sell'].push(item);
          }
          goldText.innerText=`Gold: ${gold}`;
      }
      else
      {
          if (inventory===shopInventory)
          {
            let ind=tradeArray.buy.indexOf(item);
            gold+=item.sale_value;
            tradeArray.buy.splice(ind,1);
          }
          else{
            let ind=tradeArray.sell.indexOf(item);
            gold-=item.sale_value;
            tradeArray.sell.splice(ind,1);
          }
          goldText.innerText=`Gold: ${gold}`;

      }
      console.log(tradeArray);
  });

  }
  box.appendChild(itemContainer);
}
function getPlayerInventory()
{
  //gets player inventory from db
}
function completeTransaction()
{
  //something in here to update the inventories for good if money not negative
}
createShop();