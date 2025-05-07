'use strict';
//Shop things

let shopInventory = {
  weapons: [], consumables: [],
};
let shopModal = document.querySelector('#shopModal');
let shopButt = document.querySelector('#shopButton');
let shopBox = document.querySelector('#shopInventory');
//Player things
let playerInventory = {consumables:[],weapons:[]};
let playerBox = document.querySelector('#playerInventory');
let gold = 100;
let goldText = document.querySelector('#goldText');
//Trade things
let tradeArray = {
  sell: {weapons: [], consumables: []},
  buy: {weapons: [], consumables: []},
};
let tradeWindow = document.querySelector('#tradeWindow');
let tradeBuying = document.querySelector('#buying');
let tradeSelling = document.querySelector('#selling');
let tradeButt = document.querySelector('#tradeButton');
let shopWeaponContainer=document.querySelector('#shopWeapons');
let shopConsumableContainer=document.querySelector('#shopConsumables');
let playerWeaponContainer=document.querySelector('#playerWeapons');
let playerConsumableContainer=document.querySelector('#playerConsumables');
let shopCreated = false;
let trading = false;
let adding=false;
//Modal opening and closing
window.onclick = function(event) {
  if (event.target === shopModal) {
    if (trading) {
      return;
    }
    updateGameState(username);
    shopModal.style.display = 'none';
    create_weapon_elements(gameState.weapons);
  }
};
shopButt.onclick = function() {
  if (!shopCreated) {
    let prom=updateShop();
  }
  shopModal.style.display = 'flex';
};

//Create shop elements
function createShop() {
  shopCreated = true;
  createInventoryInfo(shopInventory,'weapons', shopWeaponContainer);
  createInventoryInfo(shopInventory,'consumables', shopConsumableContainer);
  createInventoryInfo(playerInventory,'weapons', playerWeaponContainer);
  createInventoryInfo(playerInventory,'consumables', playerConsumableContainer);
  goldText.innerText = `Score: ${gold}`;
}

//Creates containers, text and buttons for items
function inventoryPrinter(inventory, box) {
  let weaponContainer = document.createElement('div');
  let consumableContainer = document.createElement('div');
  let weaponContainerHeader = document.createElement('h2');
  let consumableContainerHeader = document.createElement('h2');
  weaponContainer.classList.add('delete');
  consumableContainer.classList.add('delete');
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
    if (inventoryType==='consumables' && item.quantity===0){return;}
    let itemInfoParagraph = document.createElement('p');
    let itemDiv = document.createElement('div');
    let itemButton = document.createElement('button');
    itemButton.classList.add('button-group');
    itemDiv.classList.add('itemInfo');
    itemButton.innerText = 'Siirrä koriin';
    itemDiv.appendChild(itemButton);

    if (inventoryType === 'weapons') {
      itemInfoParagraph.innerHTML = `<b>${item.name}</b><br><br><b>Tyyppi: </b>${item.type}<b> Vahinko: </b> ${item.damage}<br><b> Kestävyys: </b> ${item.durability}<b> Hinta: </b> ${item.sale_value}`;
    } else {
      let quantityInput= document.createElement('input');
      let quantityLabel = document.createElement('label');
      quantityInput.id="quantityInput";
      quantityLabel.htmlFor='quantityInput';
      quantityInput.type="number";
      quantityInput.max= "100";
      quantityInput.min="1";
      quantityInput.defaultValue="1";
      itemInfoParagraph.innerHTML = `<b>${item.name}</b><br><br><b> Parannusvoima: </b> ${item.heal_amount}<b><br>Yhden hinta: </b> ${item.sale_value}`;
      let quantityP=document.createElement('p');
      quantityP.innerHTML=`<b>Hinta: </b>${item.sale_value*item.quantity}`;
      if (inventory===shopInventory){
        quantityP.style.display="none";
      }
      else {
        quantityInput.max=item.quantity;
      }
      quantityLabel.innerText=`/${quantityInput.max}`
      itemDiv.appendChild(quantityInput);
      itemDiv.appendChild(quantityLabel);
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
          addToTradeConsumable(itemButton,item,itemDiv,itemContainer,tradeArray.buy,inventoryType,tradeBuying,item.sale_value,itemClone,elementClone);
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
    if(adding){return;}
    adding=true;
    let quantityInput=itemdiv.childNodes.item(1);
    let quantityInputClone= elementClone.childNodes.item(1);
    let quantityValue=parseInt(quantityInput.value);
    let quantityMax= parseInt(quantityInput.max);
    let quantityP=itemdiv.childNodes.item(3);
    let quantityClone=elementClone.childNodes.item(3);
    if (quantityValue>quantityMax){
      quantityValue=quantityMax;
    }
    for (let i=1;i<=quantityValue;i++) {
      if (tradesArray[inventoryType].includes(itemClone)) {
        itemClone.quantity += 1;
        console.log(item.quantity);
        if (tradeContainer === tradeSelling) {
          item.quantity -= 1;
          console.log(item.quantity);
          if (item.quantity === 0) {
            itemdiv.style.display = "none";
          }
        }
      } else {
        tradesArray[inventoryType].push(itemClone);
        itemClone.quantity = 1;
        quantityClone.style.display = "block";
        if (tradeContainer === tradeSelling) {
          item.quantity -= 1;
          quantityP.style.display = 'block';

        }
        tradeContainer.appendChild(elementClone);
        button = elementClone.childNodes.item(0);
        button.innerText = 'Poista';
        button.onclick = function() {
          removeFromTradeCons(itemdiv, elementClone, item, itemClone,
              tradesArray, inventoryType, sale_value);
        }
      }
      quantityP.innerHTML = `<b>Hinta: </b>${item.sale_value*item.quantity}`;
      quantityClone.innerHTML = `<b>Hinta: </b>${itemClone.sale_value*itemClone.quantity}`;
      if (tradeContainer===tradeSelling){
        quantityInput.max=item.quantity.toString();
      }
      quantityInputClone.max=itemClone.quantity.toString();
      itemdiv.childNodes.item(2).innerText=`/${quantityInput.max}`;
      elementClone.childNodes.item(2).innerText=`/${quantityInputClone.max}`;
      console.log(tradeWindow);
      console.log(tradeContainer);
      gold -= sale_value;
      goldText.innerText = `Score: ${gold}`;
      tradeContainer.style.display = 'Block';
    }
    adding=false
}
function removeFromTradeCons(itemdiv,divClone,item,itemClone,tradesArray,inventoryType,sale_value){
  if (adding) {return;}
  adding=true;
  let quantityInput=divClone.childNodes.item(1);
  let quantityValue=parseInt(quantityInput.value);
  let quantityMax= parseInt(quantityInput.max);
  if (quantityValue>itemClone.quantity){quantityValue=quantityMax;}
  for (let i=1;i<=quantityValue;i++) {
    itemClone.quantity -= 1;
    divClone.childNodes.item(
        3).innerHTML = `<b>Hinta: </b>${itemClone.sale_value*itemClone.quantity}`;
    quantityInput.max=itemClone.quantity.toString();
    divClone.childNodes.item(2).innerText=`/${itemClone.quantity}`;
    gold += sale_value;
    goldText.innerText = `Score: ${gold}`;
    if (tradesArray === tradeArray.sell) {
      item.quantity += 1;
      itemdiv.childNodes.item(1).max=item.quantity.toString();
      itemdiv.style.display = "block";
      itemdiv.childNodes.item(3).innerHTML = `<b>Hinta: </b>${item.sale_value*item.quantity}`;
      itemdiv.childNodes.item(2).innerText=`/${item.quantity}`;
    }
    if (itemClone.quantity === 0) {
      let index = tradesArray[inventoryType].indexOf(itemClone);
      tradesArray[inventoryType].splice(index);
      divClone.remove();
    }
  }
  adding=false;
  console.log(tradeArray);
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
    goldText.innerText = `Score: ${gold}`;
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
    goldText.innerText = `Score: ${gold}`;
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
async function updateShop() {
  try {
    if (!shopCreated) {
      const response = await fetch(
          `http://localhost:8000/get_shop_items`,
          {method: 'GET'});
      const res_data = await response.json();
      for (let item of res_data[1]) {
        item.quantity=1;
        shopInventory.consumables.push(item);
      }
      for (let item of res_data[0]) {
        shopInventory.weapons.push(item);
      }
      console.log(playerInventory);

    }
    change_symbol_in_name(shopInventory.consumables," ","-");
    playerInventory={weapons: structuredClone(gameState.weapons),consumables: structuredClone(gameState.food)};
    console.log(gameState);
    console.log(shopInventory);
    console.log(playerInventory);
    createShop();
  }
  catch (e) {
    console.log(e);
  }
}
function deleteShop(){
  tradeSelling.classList.add('delete');
  tradeBuying.classList.add('delete');
  let containers=document.querySelectorAll('.delete');
  for(let container of containers){
    container.innerHTML="";
  }
  console.log(containers);
}
function completeTrade(){
  deleteShop();
  if(gold<0){
    alert("not enough gold");
    return;
  }
  for (let weapon of tradeArray.buy.weapons){
    weapon.current_durability=weapon.durability;
    playerInventory.weapons.push(weapon);
  }
      for (let consumable of playerInventory.consumables){
      for (let consS of tradeArray.sell.consumables){
        if (consumable.name===consS.name){
          consumable.quantity-=consS.quantity;
        }
      }
      for (let conB of tradeArray.buy.consumables){
        if(consumable.name===conB.name){
          consumable.quantity+=conB.quantity;
        }
      }
      if (consumable.quantity<0){consumable.quantity=0;}
    }
  gameState.food=playerInventory.consumables;
  gameState.weapons=playerInventory.weapons;
  tradeArray.buy.weapons=[];
  tradeArray.sell.weapons=[];
  tradeArray.sell.consumables=[];
  tradeArray.buy.consumables=[];
  updateShop().catch();
}
tradeButt.onclick=function() {
  console.log(playerInventory);
  completeTrade();
  save_game(username).catch();
  console.log(gameState);

}

