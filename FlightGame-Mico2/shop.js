'use strict'
export class Shop {
  constructor() {
    this.shopInventory = {
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
    this.playerInventory = {
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
    this.gold = 100;
    this.goldText = document.getElementById("goldText");
    this.articleInfoArray = {
      weapon: {h: "Aseet: "},
      consumable: {h: "Käyttötavarat: "}
    };
    this.tradeArray = {sell: [], buy: []};
    this.shopBox = document.getElementById("shopInventory");
    this.playerBox = document.getElementById("playerInventory");
    this.tradeWindow = document.getElementById("tradeWindow");
    this.tradeBuying = document.getElementById("buying");
    this.tradeBuyingText = document.getElementById("buyingText");
    this.tradeSellingText = document.getElementById("sellingText");
    this.tradeSelling = document.getElementById("selling");

  }

  createShop() {
    this.inventoryPrinter(this.shopInventory, this.shopBox, 'weapons', "aseet");
    this.inventoryPrinter(this.shopInventory, this.shopBox, 'consumables', "käyttötavarat");
    this.inventoryPrinter(this.playerInventory, this.playerBox, 'weapons', "aseet");
    this.inventoryPrinter(this.playerInventory, this.playerBox, 'consumables',
        "käyttötavarat");
    this.goldText.innerText = `Gold: ${this.gold}`
  }


  inventoryPrinter(inventory, box, inventoryType, titleText) {
    let itemContainer = document.createElement('div');
    let containerTitle = document.createElement('h2');
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
      button.innerText = "asdf";
      let itemdiv = document.createElement('div');
      itemdiv.style.backgroundColor = "white";
      itemdiv.appendChild(button);
      itemdiv.appendChild(p);
      itemContainer.appendChild(itemdiv);
      this.itemButtonAddListener(button, item, itemdiv, itemContainer, inventory);
    }
    box.appendChild(itemContainer);
  }

  itemButtonAddListener(button, item, itemdiv, itemContainer, inventory) {
    button.addEventListener("click", function() {
      let addToTrade = false;
      if (this.tradeWindow.contains(itemdiv)) {
        itemContainer.appendChild(itemdiv);
      } else {
        addToTrade = true;
        if (inventory === this.playerInventory) {
          this.tradeSelling.appendChild(itemdiv);

        } else {
          this.tradeBuying.appendChild(itemdiv);

        }

      }
      if (addToTrade) {
        if (inventory === this.shopInventory) {
          this.gold -= item.sale_value;
          this.tradeArray['buy'].push(item);
        } else {
          this.gold += item.sale_value;
          this.tradeArray['sell'].push(item);
        }
        this.goldText.innerText = `Gold: ${this.gold}`;
      } else {
        if (inventory === this.shopInventory) {
          let ind = this.tradeArray.buy.indexOf(item);
          this.gold += item.sale_value;
          this.tradeArray.buy.splice(ind, 1);
        } else {
          let ind = this.tradeArray.sell.indexOf(item);
          this.gold -= item.sale_value;
          this.tradeArray.sell.splice(ind, 1);
        }
        this.goldText.innerText = `Gold: ${this.gold}`;
      }
      console.log(this.tradeArray);
      //unnecessary poo?
      if (this.tradeArray.sell.length === 0) {
        this.tradeSellingText.innerHTML = "";
      } else {
        this.tradeSellingText.innerHTML = "Myytävät";
      }
      if (this.tradeArray.buy.length === 0) {
        this.tradeBuyingText.innerHTML = "";
      } else {
        this.tradeBuyingText.innerHTML = "Ostettavat";
      }
    });
  }


  unloadShop() {
    
  }


  getPlayerInventory() {
    //gets player inventory from db
  }


  completeTransaction() {
    //something in here to update the inventories for good if money not negative
  }
}