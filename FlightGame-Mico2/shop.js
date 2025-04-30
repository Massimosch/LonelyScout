'use strict'
//Shop things
    let shopInventory = {
      weapons: [
        {
          name: "a1",
          type: "kakka",
          sale_value: 140,
          damage: "10",
          durability: "100"
        },
        {
          name: "a2",
          type: "kakka",
          sale_value: 140,
          damage: "10",
          durability: "100"
        },
        {
          name: "a3",
          type: "kakka",
          sale_value: 140,
          damage: "10",
          durability: "100"
        }], consumables: []
    };
    const shopModal=document.getElementById("shopModal");
    const shopButt=document.getElementById("shopButton");
    const shopBox = document.getElementById("shopInventory");

//Player things
    let playerInventory ={
      weapons: [
        {
          name: "a1",
          type: "kakka",
          sale_value: 140,
          damage: "10",
          durability: "100"
        },
        {
          name: "a2",
          type: "kakka",
          sale_value: 140,
          damage: "10",
          durability: "100"
        },
        {
          name: "a3",
          type: "kakka",
          sale_value: 140,
          damage: "10",
          durability: "100"
        }],
      consumables: [
        {
          name: "apple",
          sale_value: 10,
          heal_amount: "20",
          quantity: 5
        }, {name: "nakki", sale_value: 10, heal_amount: "20", quantity: 5}]
    };
    const playerBox = document.getElementById("playerInventory");
    let gold = 100;
    const goldText = document.getElementById("goldText");

//Trade things
    let tradeArray = {sell: [], buy: []};
    const tradeWindow = document.getElementById("tradeWindow");
    const tradeBuying = document.getElementById("buying");
    const tradeBuyingText = document.getElementById("buyingText");
    const tradeSellingText = document.getElementById("sellingText");
    const tradeSelling = document.getElementById("selling");
    const tradeButt=document.getElementById("tradeButton");
    let shopCreated=false;
//Modal opening and closing
  window.onclick = function(event) {
  if (event.target === shopModal) {
    shopModal.style.display="none";
  }}
  shopButt.onclick= function(){
    if (!shopCreated){
      createShop();
    }
    shopModal.style.display="flex";
  };

//Create shop elements
  function createShop() {
    shopCreated=true;
    inventoryPrinter(shopInventory, shopBox, 'weapons', "aseet");
    inventoryPrinter(shopInventory, shopBox, 'consumables', "käyttötavarat");
    inventoryPrinter(playerInventory, playerBox, 'weapons', "aseet");
    inventoryPrinter(playerInventory, playerBox, 'consumables',
        "käyttötavarat");
    goldText.innerText = `Gold: ${gold}`
  }

//Creates containers, text and buttons for items
  function inventoryPrinter(inventory, box, inventoryType, titleText) {
    let itemContainer = document.createElement('div');
    let containerTitle = document.createElement('h2');
    containerTitle.classList.add("shoph");
    containerTitle.innerText = titleText;
    itemContainer.appendChild(containerTitle);
    for (let item of inventory[inventoryType]) {
      let p = document.createElement('p');
      if (inventoryType === 'weapons') {
        p.innerText = item.name + ", Tyyppi: " + item.type + ", Kestävyys: " +
            item.durability + ", Vahinko:" + item.damage + ", Hinta: " +
            item.sale_value;
      } else {
        p.innerText = item.name;
      }
      let button = document.createElement('button');
      if (inventory===shopInventory)
      {
        button.innerText = "Osta";
      }
      else {
        button.innerText = "Myy";
      }

      let itemdiv = document.createElement('div');
      itemdiv.classList.add("itemInfo")
      itemdiv.appendChild(button);
      itemdiv.appendChild(p);
      itemdiv.id=item.toString();
      itemContainer.appendChild(itemdiv);
      itemButtonAddListener(button, item, itemdiv, itemContainer, inventory);
    }
    box.appendChild(itemContainer);
  }

//gives item buttons event listeners for adding into and out of trade window
  function itemButtonAddListener(button, item, itemdiv, itemContainer, inventory) {
    button.addEventListener("click", function() {
      let addToTrade = false;
      console.log(tradeWindow)
      if (tradeWindow.contains(itemdiv)) {
        itemContainer.appendChild(itemdiv);
      } else {
        addToTrade = true;
        if (inventory === playerInventory) {
          tradeSelling.appendChild(itemdiv);

        } else {
          tradeBuying.appendChild(itemdiv);
        }
        tradeButt.style.display="block";
      }
      if (addToTrade) {
        if (inventory === shopInventory) {
          gold -= item.sale_value;
          tradeArray['buy'].push(item);
        } else {
          gold += item.sale_value;
          tradeArray['sell'].push(item);
        }
        goldText.innerText = `Gold: ${gold}`;
      } else {
        if (inventory === shopInventory) {
          let ind = tradeArray.buy.indexOf(item);
          gold += item.sale_value;
          tradeArray.buy.splice(ind, 1);
        } else {
          let ind = tradeArray.sell.indexOf(item);
          gold -= item.sale_value;
          tradeArray.sell.splice(ind, 1);
        }
        goldText.innerText = `Gold: ${gold}`;
      }
      console.log(tradeArray);
      //unnecessary poo?
      if (tradeArray.sell.length === 0) {
        tradeSellingText.innerHTML = "";
      } else {
        tradeSellingText.innerHTML = "Myytävät";
      }
      if (tradeArray.buy.length === 0) {
        tradeBuyingText.innerHTML = "";
      } else {
        tradeBuyingText.innerHTML = "Ostettavat";
      }
      if (tradeArray.sell.length===0 && tradeArray.buy.length===0){
        tradeButt.style.display="none";
      }
    });
  }


  function unloadShop() {

  }


  function getPlayerInventory() {
    //gets player inventory from db
  }


  function completeTransaction() {
    //something in here to update the inventories for good if money not negative
  }
