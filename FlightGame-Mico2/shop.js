'use strict';


let shopInventory = {
  weapons: [], consumables: [],
};
let shopModal = document.querySelector('#shopModal');
let shopButt = document.querySelector('#shopButton');

let playerInventory = {consumables: [], weapons: []};
let gold = 100;
let goldText = document.querySelector('#goldText');

let tradeArray = {
  sell: {weapons: [], consumables: []},
  buy: {weapons: [], consumables: []},
};
let tradeWindow = document.querySelector('#tradeWindow');
let tradeBuying = document.querySelector('#buying');
let tradeSelling = document.querySelector('#selling');
let tradeButt = document.querySelector('#tradeButton');
let shopWeaponContainer = document.querySelector('#shopWeapons');
let shopConsumableContainer = document.querySelector('#shopConsumables');
let playerWeaponContainer = document.querySelector('#playerWeapons');
let playerConsumableContainer = document.querySelector('#playerConsumables');
let closeShop = document.querySelector('.closeShop');
let shopCreated = false;
let trading = false;
let adding = false;

closeShop.addEventListener('click', () => {
  if (trading) {
    return;
  }
  location.reload();
});
window.onclick = function(event) {
  if (event.target === shopModal) {
    if (trading) {
      return;
    }
    location.reload();
  }
};
shopButt.onclick = function() {
    updateShop().catch();
    shopModal.style.display="flex";
};

function createInventoryInfo(inventory, inventoryType, itemContainer) {
  for (let item of inventory[inventoryType]) {
    if (inventoryType === 'consumables' && item.quantity === 0 || inventoryType==='weapons' && item.current_durability===0) {
      return;
    }
    let itemInfoParagraph = document.createElement('p');
    let itemDiv = document.createElement('div');
    let itemButton = document.createElement('button');
    itemButton.classList.add('button-group');
    itemDiv.classList.add('itemInfo');
    itemButton.innerText = 'Siirrä koriin';
    itemDiv.appendChild(itemButton);

    if (inventoryType === 'weapons') {
      itemInfoParagraph.innerHTML = `<b>${item.name}</b><br><br><b>Tyyppi: </b>${item.type}<b> Vahinko: </b> ${item.damage}<br><b> Kestävyys: </b> ${item.current_durability}<b> Hinta: </b> ${Math.round(item.sale_value/item.durability*item.current_durability)}`;
    } else {
      let quantityInput = document.createElement('input');
      let quantityLabel = document.createElement('label');
      quantityInput.id = 'quantityInput';
      quantityLabel.htmlFor = 'quantityInput';
      quantityInput.type = 'number';
      quantityInput.max = '100';
      quantityInput.min = '1';
      quantityInput.defaultValue = '1';
      itemInfoParagraph.innerHTML = `<b>${item.name}</b><br><br><b> Parannusvoima: </b> ${item.heal_amount}<b><br>Yhden hinta: </b> ${item.sale_value}`;
      let quantityP = document.createElement('p');
      quantityP.innerHTML = `<b>Hinta: </b>${item.sale_value * item.quantity}`;
      if (inventory === shopInventory) {
        quantityP.style.display = 'none';
      } else {
        quantityInput.max = item.quantity;
      }
      quantityLabel.innerText = `/${quantityInput.max}`;
      itemDiv.appendChild(quantityInput);
      itemDiv.appendChild(quantityLabel);
      itemDiv.appendChild(quantityP);
    }
    itemDiv.appendChild(itemInfoParagraph);
    itemContainer.appendChild(itemDiv);
    if (inventoryType === 'weapons') {
      if(inventory===shopInventory){
        itemButton.onclick = function() {
        addToTrade(itemButton, item, itemDiv, itemContainer,
            tradeArray.buy,
            inventoryType,
            tradeBuying);
      };
      }
        else if(inventory===playerInventory){
        itemButton.onclick = function() {
        addToTrade(itemButton, item, itemDiv, itemContainer,
            tradeArray.sell,
            inventoryType,
            tradeSelling);
      };
      }

    }
    if (inventoryType === 'consumables') {
      let itemClone = structuredClone(item);
      let elementClone = itemDiv.cloneNode(true);
      itemButton.onclick = function() {
        addToTradeConsumable(itemButton, item, itemDiv, itemContainer,
            ((inventory === shopInventory) ? tradeArray.buy : tradeArray.sell),
            inventoryType,
            ((inventory === shopInventory) ? tradeBuying : tradeSelling),
            ((inventory === shopInventory) ?
                item.sale_value :
                -item.sale_value), itemClone, elementClone);
      };
    }
  }
}

function addToTradeConsumable(
    button, item, itemdiv, itemContainer, tradesArray, inventoryType,
    tradeContainer, sale_value, itemClone, elementClone) {
  if (adding||trading) {
    return;
  }
  adding = true;
  let quantityInput = itemdiv.childNodes.item(1);
  let quantityInputClone = elementClone.childNodes.item(1);
  let quantityValue = parseInt(quantityInput.value);
  let quantityMax = parseInt(quantityInput.max);
  let quantityP = itemdiv.childNodes.item(3);
  let quantityClone = elementClone.childNodes.item(3);
  if (quantityValue > quantityMax) {
    quantityValue = quantityMax;
  }
  if (tradesArray[inventoryType].includes(itemClone)) {
    itemClone.quantity += quantityValue;
    console.log(item.quantity);
    if (tradeContainer === tradeSelling) {
      item.quantity -= quantityValue;
      console.log(item.quantity);
      if (item.quantity === 0) {
        itemdiv.style.display = 'none';
      }
    }
  } else {
    tradesArray[inventoryType].push(itemClone);
    itemClone.quantity = quantityValue;
    quantityClone.style.display = 'block';
    if (tradeContainer === tradeSelling) {
      item.quantity -= quantityValue;
      quantityP.style.display = 'block';
      if (item.quantity === 0) {
        itemdiv.style.display = 'none';
      }
    }
    tradeContainer.appendChild(elementClone);
    button = elementClone.childNodes.item(0);
    button.innerText = 'Poista';
    button.onclick = function() {
      removeFromTradeCons(itemdiv, elementClone, item, itemClone,
          tradesArray, inventoryType, sale_value);
    };
  }
  quantityP.innerHTML = `<b>Hinta: </b>${item.sale_value * item.quantity}`;
  quantityClone.innerHTML = `<b>Hinta: </b>${itemClone.sale_value *
  itemClone.quantity}`;
  if (tradeContainer === tradeSelling) {
    quantityInput.max = item.quantity.toString();
  }
  quantityInputClone.max = itemClone.quantity.toString();
  itemdiv.childNodes.item(2).innerText = `/${quantityInput.max}`;
  elementClone.childNodes.item(2).innerText = `/${quantityInputClone.max}`;
  console.log(tradeWindow);
  console.log(tradeContainer);
  gold -= sale_value*quantityValue;
  goldText.innerText = `Score: ${gold}`;
  tradeContainer.style.display = 'Block';

  adding = false;
}

function removeFromTradeCons(
    itemdiv, divClone, item, itemClone, tradesArray, inventoryType,
    sale_value) {
  if (adding) {
    return;
  }
  adding = true;
  let quantityInput = divClone.childNodes.item(1);
  let quantityValue = parseInt(quantityInput.value);
  let quantityMax = parseInt(quantityInput.max);
  if (quantityValue > itemClone.quantity) {
    quantityValue = quantityMax;
  }
  itemClone.quantity -= quantityValue;
  divClone.childNodes.item(
      3).innerHTML = `<b>Hinta: </b>${itemClone.sale_value *
  itemClone.quantity}`;
  quantityInput.max = itemClone.quantity.toString();
  divClone.childNodes.item(2).innerText = `/${itemClone.quantity}`;
  gold += sale_value*quantityValue;
  goldText.innerText = `Score: ${gold}`;
  if (tradesArray === tradeArray.sell) {
    item.quantity += quantityValue;
    itemdiv.childNodes.item(1).max = item.quantity.toString();
    itemdiv.style.display = 'block';
    itemdiv.childNodes.item(3).innerHTML = `<b>Hinta: </b>${item.sale_value *
    item.quantity}`;
    itemdiv.childNodes.item(2).innerText = `/${item.quantity}`;
  }
  if (itemClone.quantity === 0) {
    let index = tradesArray[inventoryType].indexOf(itemClone);
    tradesArray[inventoryType].splice(index);
    divClone.remove();
  }
  adding = false;
  console.log(tradeArray);
}

function addToTrade(
    button, item, itemdiv, itemContainer, tradesArray, inventoryType,
    tradeContainer) {
    let price=item.sale_value;
    if (tradesArray === tradeArray.buy) {
      itemdiv = itemdiv.cloneNode(true);
      button = itemdiv.childNodes.item(0);
          for (let weapon of tradesArray[inventoryType]){
      if (item.name===weapon.name){
        return;
      }
    }
    }
    else{
      price=-Math.round(item.sale_value/item.durability*item.current_durability);
    }
    button.innerText = 'Poista';
    console.log(tradeWindow);
    console.log(tradeContainer);
    tradeContainer.appendChild(itemdiv);
    gold -= price;
    tradesArray[inventoryType].push(item);
    goldText.innerText = `Score: ${gold}`;
    tradeContainer.style.display = 'Block';
    button.onclick = function() {
    removeFromTrade(button, item, itemdiv, itemContainer, tradesArray,
        inventoryType, tradeContainer, price);};
}

function removeFromTrade(
    button, item, itemdiv, itemContainer, tradesArray, inventoryType,
    tradeContainer, sale_value) {
    button.innerText = 'Siirrä koriin';
    let ind = tradesArray[inventoryType].indexOf(item);
    gold += sale_value;
    tradesArray[inventoryType].splice(ind, 1);
    goldText.innerText = `Score: ${gold}`;
    if (tradesArray === tradeArray.buy) {
      tradeContainer.removeChild(itemdiv);
      itemdiv.remove();
    } else {
      itemContainer.appendChild(itemdiv);
      button.onclick=function() {
      addToTrade(button, item, itemdiv, itemContainer, tradesArray,
          inventoryType,
          tradeContainer, sale_value);};
    }
    if (tradesArray['weapons'].length === 0 &&
        tradesArray['consumables'].length === 0) {
      tradeContainer.style.display = 'none';
    }
}

async function updateShop() {
  try {
    if (!shopCreated) {
      const response = await fetch(
          `http://localhost:8000/get_shop_items`,
          {method: 'GET'});
      const res_data = await response.json();
      for (let item of res_data[1]) {
        item.quantity = 1;
        shopInventory.consumables.push(item);
      }
      for (let item of res_data[0]) {
        item.current_durability=item.durability;
        shopInventory.weapons.push(item);
      }
      console.log(playerInventory);
    }
    gold = structuredClone(gameState.playerState.score);
    change_symbol_in_name(shopInventory.consumables, ' ', '-');
    playerInventory = {
      weapons: structuredClone(gameState.weapons),
      consumables: structuredClone(gameState.food),
    };
    console.log(gameState);
    console.log(shopInventory);
    console.log(playerInventory);
    shopCreated = true;
    createInventoryInfo(shopInventory, 'weapons', shopWeaponContainer);
    createInventoryInfo(shopInventory, 'consumables', shopConsumableContainer);
    createInventoryInfo(playerInventory, 'weapons', playerWeaponContainer);
    createInventoryInfo(playerInventory, 'consumables',
      playerConsumableContainer);
    goldText.innerText = `Score: ${gold}`;
  } catch (e) {
    console.log(e);
  }
}

async function completeTrade() {
  for (let weapon of tradeArray.buy.weapons) {
    for (let shopWeapon of shopInventory.weapons){
      if (weapon.name===shopWeapon.name){
        weapon.item_id=shopWeapon.id;
      }
    }
    delete weapon.id;
    playerInventory.weapons.push(weapon);
  }
  console.log(tradeArray.sell);
  for (let weapon of tradeArray.sell.weapons) {
    for (let playerWeapon of playerInventory.weapons){
      if (weapon.id===playerWeapon.id){
        playerWeapon.current_durability=0;
        console.log("asdf")
        break;
      }
    }
  }
  for (let consumable of playerInventory.consumables) {
    for (let conB of tradeArray.buy.consumables) {
      if (consumable.name === conB.name) {
        consumable.quantity += conB.quantity;
      }
    }
    if (consumable.quantity < 0) {
      consumable.quantity = 0;
    }
  }
  gameState.food = playerInventory.consumables;
  gameState.weapons = playerInventory.weapons;
  gameState.playerState.score = gold;
  tradeArray={sell:{weapons: [],consumables: []},buy:{weapons:[],consumables: []}};
  console.log(tradeArray);
}

tradeButt.onclick = async function() {
  if (gold < 0) {
    alert('not enough gold');
    return;
  }
  await completeTrade();
  await save_game(username);
  location.reload();
};

