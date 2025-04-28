'use strict'
const shopInventory= {
    weapons:[{name:"a1", type:"kakka", sale_value:"140", damage:"10",durability:"100"},
  {name:"a2", type:"kakka", sale_value:"140", damage:"10",durability:"100"},
{name:"a3", type:"kakka", sale_value:"140", damage:"10",durability:"100"}]
};
const playerInventory={
    weapons:[{name:"a1", type:"kakka", sale_value:"140", damage:"10",durability:"100", amount:1},
  {name:"a2", type:"kakka", sale_value:"140", damage:"10",durability:"100",amount:2},
{name:"a3", type:"kakka", sale_value:"140", damage:"10",durability:"100",amount:3}]
};
const articleInfoArray={weapon:{h:"Aseet: "},consumable:{h:"Käyttötavarat: "}};
const tradeArray=[];
const shopBox= document.getElementById("shopInventory");
const playerBox=document.getElementById("playerInventory");
const tradeWindow= document.getElementById("tradeWindow");
async function getData(){

}
function createShop()
{
  printInventory(shopInventory,shopBox);
  printInventory(playerInventory, playerBox);
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
    p.innerText=item;
    let button= document.createElement('button');
    button.innerText="asdf";
    if(inventory===playerInventory)
    {
      button.addEventListener("click",function(){
          console.log(item.amount);
          item.amount-=1;
          let index=tradeArray.indexOf(item);
          if (tradeArray[index]){
            let index= tradeArray.indexOf(item);
            tradeArray[index].amount+=1;
                      console.log(tradeArray[index]);
          }
          else {
            tradeArray.push(item);
            let index= tradeArray.indexOf(item)
            tradeArray[index].amount=1;
                      console.log(tradeArray[index]);
          }
          if (item.amount<1)
          {
            playerInventory['weapons'].splice(item);
            console.log("+")
            itemContainer.removeChild(button);
            itemContainer.removeChild(p);
          }
    });
    }
    itemContainer.appendChild(button);
    itemContainer.appendChild(p);
  }
  box.appendChild(itemContainer);
}

function getPlayerInventory()
{
  //gets player inventory from db
}
function completeTransaction()
{

}
createShop();