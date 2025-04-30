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
let tradeArray = {sell: {weapons:[],consumables:[]}, buy: {weapons:[],consumables:[]}};
const tradeWindow = document.getElementById('tradeWindow');
let tradeBuying = document.getElementById('buying');
const tradeSelling = document.getElementById('selling');
const tradeButt = document.getElementById('tradeButton');
let shopCreated = false;
//Modal opening and closing
window.onclick = function(event) {
  if (event.target === shopModal) {
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
  weaponContainerHeader.innerText = "Aseet";
  weaponContainer.appendChild(weaponContainerHeader);
  createInventoryInfo(inventory,'weapons',weaponContainer);
  consumableContainerHeader.innerText="Käyttötavarat";
  consumableContainer.appendChild(consumableContainerHeader);
  createInventoryInfo(inventory,'consumables',consumableContainer);
  box.appendChild(weaponContainer);
  box.appendChild(consumableContainer);
}
function createInventoryInfo(inventory,inventoryType,itemContainer) {
   for (let item of inventory[inventoryType]) {
    let itemInfoParagraph = document.createElement('p');
    if (inventoryType === 'weapons') {
      itemInfoParagraph.innerText = item.name + ', Tyyppi: ' + item.type + ', Kestävyys: ' +
          item.durability + ', Vahinko:' + item.damage + ', Hinta: ' +
          item.sale_value;
    }
    else {
      itemInfoParagraph.innerText = item.name;
    }
    let itemButton = document.createElement('button');
    itemButton.innerText="Siirrä koriin";
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('itemInfo');
    itemDiv.appendChild(itemButton);
    itemDiv.appendChild(itemInfoParagraph);
    itemContainer.appendChild(itemDiv);
    if (inventory === shopInventory) {
      addToTrade(itemButton, item, itemDiv, itemContainer, tradeArray.buy[inventoryType],
          tradeBuying,item.sale_value);
    } else if (inventory === playerInventory) {
      addToTrade(itemButton, item, itemDiv, itemContainer, tradeArray.sell[inventoryType],
          tradeSelling,-item.sale_value);
    }
  }
}

function addToTrade(button, item, itemdiv, itemContainer, tradesArray, tradeContainer,sale_value) {
    button.onclick=function() {
    button.innerText="Poista";
    console.log(tradeWindow);
    console.log(tradeContainer);
    tradeContainer.appendChild(itemdiv);
    gold -= sale_value;
    tradesArray.push(item);
    goldText.innerText = `Gold: ${gold}`;
    tradeContainer.style.display = 'Block';
    removeFromTrade(button, item,itemdiv,itemContainer,tradesArray,tradeContainer,sale_value);
  };
}

function removeFromTrade(button, item, itemdiv, itemContainer, tradesArray, tradeContainer,sale_value){
  button.onclick= function() {
    button.innerText="Siirrä koriin";
    itemContainer.appendChild(itemdiv);
    let ind = tradesArray.indexOf(item);
    gold += sale_value;
    tradesArray.splice(ind, 1);
    goldText.innerText = `Gold: ${gold}`;
    if (tradesArray.length === 0) {
      tradeContainer.style.display = 'none';
    }
    addToTrade(button, item, itemdiv, itemContainer, tradesArray,
        tradeContainer,sale_value)
  };
}
function completeTrade(type){
  for (let item of tradeArray.buy[type]){

  }
}
