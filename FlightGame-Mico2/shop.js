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
let tradeArray = {sell: [], buy: []};
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
  inventoryPrinter(shopInventory, shopBox, 'weapons', 'aseet');
  inventoryPrinter(shopInventory, shopBox, 'consumables', 'käyttötavarat');
  inventoryPrinter(playerInventory, playerBox, 'weapons', 'aseet');
  inventoryPrinter(playerInventory, playerBox, 'consumables', 'käyttötavarat');
  goldText.innerText = `Gold: ${gold}`;
}

//Creates containers, text and buttons for items
function inventoryPrinter(inventory, box, inventoryType, titleText) {
  let itemContainer = document.createElement('div');
  let containerTitle = document.createElement('h2');
  containerTitle.classList.add('shoph');
  containerTitle.innerText = titleText;
  itemContainer.appendChild(containerTitle);
  for (let item of inventory[inventoryType]) {
    let p = document.createElement('p');
    if (inventoryType === 'weapons') {
      p.innerText = item.name + ', Tyyppi: ' + item.type + ', Kestävyys: ' +
          item.durability + ', Vahinko:' + item.damage + ', Hinta: ' +
          item.sale_value;
    } else {
      p.innerText = item.name;
    }
    let button = document.createElement('button');
    if (inventory === shopInventory) {
      button.innerText = 'Osta';
    } else {
      button.innerText = 'Myy';
    }

    let itemdiv = document.createElement('div');
    itemdiv.classList.add('itemInfo');
    itemdiv.appendChild(button);
    itemdiv.appendChild(p);
    itemdiv.id = item.toString();
    itemContainer.appendChild(itemdiv);
    if (inventory === shopInventory) {
      addToTrade(button, item, itemdiv, itemContainer, tradeArray.buy,
          tradeBuying);
    } else if (inventory === playerInventory) {
      addToTrade(button, item, itemdiv, itemContainer, tradeArray.sell,
          tradeSelling);
    }
  }
  box.appendChild(itemContainer);
}

function addToTrade(button, item, itemdiv, itemContainer, tradesArray, tradeContainer) {
    button.onclick=function() {
    console.log(tradeWindow);
    console.log(tradeContainer);
    tradeContainer.appendChild(itemdiv);
    gold -= item.sale_value;
    tradesArray.push(item);
    goldText.innerText = `Gold: ${gold}`;
    tradeContainer.style.display = 'Block';
    removeFromTrade(button, item,itemdiv,itemContainer,tradesArray,tradeContainer);
  };
}

function removeFromTrade(button, item, itemdiv, itemContainer, tradesArray, tradeContainer){
  button.onclick= function() {
    itemContainer.appendChild(itemdiv);
    let ind = tradesArray.indexOf(item);
    gold += item.sale_value;
    tradesArray.splice(ind, 1);
    goldText.innerText = `Gold: ${gold}`;
    if (tradesArray.length === 0) {
      tradeContainer.style.display = 'none';
    }
    addToTrade(button, item, itemdiv, itemContainer, tradesArray,
        tradeContainer)
  };
}
