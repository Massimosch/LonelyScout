'use strict';
//Shop things
let shopInventory = {
  weapons: [
    {
      name: 'a1',
      type: 'kakka',
      sale_value: 140,
      damage: '10',
      durability: '100',
    },
    {
      name: 'a2',
      type: 'kakka',
      sale_value: 140,
      damage: '10',
      durability: '100',
    },
    {
      name: 'a3',
      type: 'kakka',
      sale_value: 140,
      damage: '10',
      durability: '100',
    }], consumables: [],
};
const shopModal = document.getElementById('shopModal');
const shopButt = document.getElementById('shopButton');
const shopBox = document.getElementById('shopInventory');

//Player things
let playerInventory = {
  weapons: [
    {
      name: 'a1',
      type: 'kakka',
      sale_value: 140,
      damage: '10',
      durability: '100',
    },
    {
      name: 'a2',
      type: 'kakka',
      sale_value: 140,
      damage: '10',
      durability: '100',
    },
    {
      name: 'a3',
      type: 'kakka',
      sale_value: 140,
      damage: '10',
      durability: '100',
    }],
  consumables: [
    {
      name: 'apple',
      sale_value: 10,
      heal_amount: '20',
      quantity: 5,
    }, {name: 'nakki', sale_value: 10, heal_amount: '20', quantity: 5}],
};
const playerBox = document.getElementById('playerInventory');
let gold = 100;
const goldText = document.getElementById('goldText');

//Trade things
let tradeArray = {
  sell: {weapons: [], consumables: []},
  buy: {weapons: [], consumables: []},
};
const tradeWindow = document.getElementById('tradeWindow');
let tradeBuying = document.getElementById('buying');
const tradeSelling = document.getElementById('selling');
const tradeButt = document.getElementById('tradeButton');
let shopCreated = false;
let trading = false;
//Modal opening and closing
window.onclick = function(event) {
  if (event.target === shopModal) {
    if (trading) {
      return;
    }
    shopModal.style.display = 'none';
  }
};
shopButt.onclick = function() {
  if (!shopCreated) {
    createShop();
  }
  shopModal.style.display = 'flex';
};

//Create shop elements
function createShop() {
  shopCreated = true;
  inventoryPrinter(shopInventory, shopBox);
  inventoryPrinter(playerInventory, playerBox);
  goldText.innerText = `Gold: ${gold}`;
}

//Creates containers, text and buttons for items
function inventoryPrinter(inventory, box) {
  let weaponContainer = document.createElement('div');
  let consumableContainer = document.createElement('div');
  let weaponContainerHeader = document.createElement('h2');
  let consumableContainerHeader = document.createElement('h2');
  weaponContainerHeader.classList.add('shoph');
  consumableContainerHeader.classList.add('shoph');
  weaponContainerHeader.innerText = 'Aseet';
  weaponContainer.appendChild(weaponContainerHeader);
  createInventoryInfo(inventory, 'weapons', weaponContainer);
  consumableContainerHeader.innerText = 'Käyttötavarat';
  consumableContainer.appendChild(consumableContainerHeader);
  createInventoryInfo(inventory, 'consumables', consumableContainer);
  box.appendChild(weaponContainer);
  box.appendChild(consumableContainer);
}
function createInventoryInfo(inventory, inventoryType, itemContainer) {
  for (let item of inventory[inventoryType]) {
    let itemInfoParagraph = document.createElement('p');
    let itemDiv = document.createElement('div');
    let itemButton = document.createElement('button');
    itemButton.classList.add('button-group');
    itemDiv.classList.add('itemInfo');
    itemButton.innerText = 'Siirrä koriin';
    itemDiv.appendChild(itemButton);
    if (inventoryType === 'weapons') {
      itemInfoParagraph.innerHTML = `<b><b>${item.name}</b></b><br><b>Tyyppi: </b>${item.type}<b> Vahinko: </b> ${item.damage}<br><b> Kestävyys: </b> ${item.durability}<b> Hinta: </b> ${item.sale_value}`;
    } else {
      itemInfoParagraph.innerHTML = `<b><b>${item.name}</b><br><b> Parannusvoima: </b> ${item.heal_amount}<b> Hinta: </b> ${item.sale_value}`;
      let quantityP=document.createElement('p');
      quantityP.innerHTML=`${item.quantity}`;
      if (inventory===shopInventory){
        quantityP.style.display="none";
      }
      itemDiv.appendChild(quantityP);
    }
    itemDiv.appendChild(itemInfoParagraph);
    itemContainer.appendChild(itemDiv);
    if (inventory === shopInventory) {
      if(inventoryType==='weapons'){
        addToTrade(itemButton, item, itemDiv, itemContainer, tradeArray.buy,
          inventoryType,
          tradeBuying, item.sale_value);
      }
      else{
        let itemClone=structuredClone(item);
        let elementClone=itemDiv.cloneNode(true);
        itemButton.onclick = function() {
          addToTradeConsumable(itemButton,item,itemDiv,itemContainer,tradeArray.sell,inventoryType,tradeSelling,-item.sale_value,itemClone,elementClone,);
        }
      }

    } else if (inventory === playerInventory) {
      if(inventoryType==='weapons'){
      addToTrade(itemButton, item, itemDiv, itemContainer, tradeArray.sell,
          inventoryType,
          tradeSelling, -item.sale_value);
      }
      else{
        let itemClone=structuredClone(item);
        let elementClone=itemDiv.cloneNode(true);
        itemButton.onclick = function() {
          addToTradeConsumable(itemButton,item,itemDiv,itemContainer,tradeArray.sell,inventoryType,tradeSelling,-item.sale_value,itemClone,elementClone);
        }
      }
    }
  }
}
function addToTradeConsumable(
    button, item, itemdiv, itemContainer, tradesArray, inventoryType,
    tradeContainer, sale_value,itemClone,elementClone) {
    let quantityP=itemdiv.childNodes.item(1);
    let quantityClone=elementClone.childNodes.item(1);
    if(tradesArray[inventoryType].includes(itemClone))
    {
      let index=tradesArray[inventoryType].indexOf(itemClone);
      let itemi=tradesArray[inventoryType][index];
      itemi.quantity+=1;
      quantityClone.innerHTML=`${itemClone.quantity}`;
      console.log(itemi.quantity);
      if(tradeContainer===tradeSelling){
        item.quantity-=1;
        console.log(item.quantity);
        quantityP.innerHTML=`${item.quantity}`;
        if (item.quantity===0){
          itemdiv.style.display="none";
        }
      }
    }
    else{
          tradesArray[inventoryType].push(itemClone);
          itemClone.quantity=1;
          quantityClone.innerHTML=`${itemClone.quantity}`;
          if (tradeContainer===tradeSelling){
            item.quantity-=1;
            quantityP.style.display='block';
            quantityP.innerHTML=`${item.quantity}`;
          }
          tradeContainer.appendChild(elementClone);
          button=elementClone.childNodes.item(0);
          button.innerText = 'Poista';
          button.onclick=function() {
            removeFromTradeCons(itemdiv,elementClone,item,itemClone,tradesArray,inventoryType,sale_value);
          }
    }
    console.log(tradeWindow);
    console.log(tradeContainer);
    gold -= sale_value;
    goldText.innerText = `Gold: ${gold}`;
    tradeContainer.style.display = 'Block';
}
function removeFromTradeCons(itemdiv,divClone,item,itemClone,tradesArray,inventoryType,sale_value){
  itemClone.quantity-=1;
  divClone.childNodes.item(1).innerHTML=`${itemClone.quantity}`;
  gold += sale_value;
  goldText.innerText = `Gold: ${gold}`;
  if(tradesArray===tradeArray.sell){
  item.quantity+=1;
  itemdiv.style.display="block";
  itemdiv.childNodes.item(1).innerHTML=`${item.quantity}`;
  }
  if (itemClone.quantity===0){
    let index=tradesArray[inventoryType].indexOf(itemClone);
    tradesArray[inventoryType].splice(index);
    divClone.remove();
  }
}
function addToTrade(
    button, item, itemdiv, itemContainer, tradesArray, inventoryType,
    tradeContainer, sale_value) {
  button.onclick = function() {
    if (tradesArray === tradeArray.buy) {
      itemdiv = itemdiv.cloneNode(true);
      button = itemdiv.childNodes.item(0);
    }
    button.innerText = 'Poista';
    console.log(tradeWindow);
    console.log(tradeContainer);
    tradeContainer.appendChild(itemdiv);
    gold -= sale_value;
    tradesArray[inventoryType].push(item);
    goldText.innerText = `Gold: ${gold}`;
    tradeContainer.style.display = 'Block';
    removeFromTrade(button, item, itemdiv, itemContainer, tradesArray,
        inventoryType, tradeContainer, sale_value);
  };
}

function removeFromTrade(
    button, item, itemdiv, itemContainer, tradesArray, inventoryType,
    tradeContainer, sale_value) {
  button.onclick = function() {
    button.innerText = 'Siirrä koriin';
    let ind = tradesArray[inventoryType].indexOf(item);
    gold += sale_value;
    tradesArray[inventoryType].splice(ind, 1);
    goldText.innerText = `Gold: ${gold}`;
    if (tradesArray === tradeArray.buy) {
      tradeContainer.removeChild(itemdiv);
      itemdiv.remove();
    } else {
      itemContainer.appendChild(itemdiv);
      addToTrade(button, item, itemdiv, itemContainer, tradesArray,
          inventoryType,
          tradeContainer, sale_value);
    }
    if (tradesArray['weapons'].length === 0 &&
        tradesArray['consumables'].length === 0) {
      tradeContainer.style.display = 'none';
    }
  };
}
async function unload(){
  let deletable=document.getElementsByClassName('itemInfo');
  for(let element of deletable){
    element.remove();
  }
  shopCreated=false;
}
async function completeTrade(tradeType, itemType, inventory) {
  if (tradeArray[tradeType][itemType].length !== 0) {
    for (let item of tradeArray[tradeType][itemType]) {
      //add/remove item to/from db inventory
    }
  }
}
