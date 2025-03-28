import item
import random
import weapon
import inventory
from weapon import Weapon


class Shop:
    def __init__(self, player_inventory):
        #create shop inventory
        self.shop_stuff={
            "buying":{"commands":("1","Buy"),"inventory":inventory.Inventory()},
            "selling":{"commands":("2","Sell"),"inventory":player_inventory},
            "leave":{"commands":("3","Leave")}
        }
        self.shop_stuff["buying"]["inventory"].items=item.itemsanakirja
        self.shop_stuff["buying"]["inventory"].weapons=[weapon.Weapon("sword",10,5),weapon.Weapon("wep2",2,8)]

    def shop(self):
        shopping=True
        while shopping:
            print("Do you want to buy or sell?")
            print(f"Money: {self.shop_stuff["selling"]["inventory"].money}\n")
            print(*[action["commands"][0]+". "+action["commands"][1] for i, action in self.shop_stuff.items()], sep="\n")
            command = input("")

            if not command or command in self.shop_stuff["leave"]["commands"]:
                shopping=False
            for action , action_necessities in self.shop_stuff.items():
                if command.capitalize() in action_necessities["commands"]:
                    in_transaction = True
                    while in_transaction:
                        print("-------------------------------------------------------------------------")
                        print(f"Which item would you like to {action_necessities["commands"][1].lower()}? (press enter to leave))")
                        print("\nConsumables:\n")

                        temp_item_list = self.__print_inventory(action_necessities["inventory"])

                        transaction_command=input("")
                        for item_info in temp_item_list:
                            if transaction_command and transaction_command in item_info or transaction_command.isnumeric() and int(transaction_command) in item_info:
                                if action_necessities["commands"][1] == "Sell":
                                    self.__sell(item_info[2], item_info[0], item_info[3],item_info[4])
                                    break
                                elif action_necessities["commands"][1]== "Buy":
                                    self.__buy(item_info[2], item_info[0],item_info[3],item_info[4])
                                    break
                            else:
                                in_transaction=False

    def __sell(self, item_type, item_to_sell, price, quantity=1):
        quantity=self.__quantity("Sell",quantity)
        self.shop_stuff["selling"]["inventory"].money += price * int(quantity)
        print(f"you got {price * int(quantity)} moneys")
        if item_type== "consumable" and self.shop_stuff["selling"]["inventory"].items[item_to_sell].quantity >= int(quantity):
            for i in range(int(quantity)):
                self.shop_stuff["selling"]["inventory"].remove_item(item_to_sell)
        elif item_type== "weapon":
            self.shop_stuff["selling"]["inventory"].weapons.remove(item_to_sell)
        else:
            print("invalid quantity")

    def __buy(self, item_type, item_to_buy, price, quantity=1):
        quantity=self.__quantity("Buy",quantity)
        if item_type=="consumable" and self.shop_stuff["selling"]["inventory"].money - price * int(quantity) >= 0:
            for i in range(int(quantity)):
                self.shop_stuff["selling"]["inventory"].money -= price
                self.shop_stuff["selling"]["inventory"].add_item(item_to_buy)
        elif item_type=="weapon" and self.shop_stuff["selling"]["inventory"].money - price >= 0:
            self.shop_stuff["selling"]["inventory"].money -= price
            self.shop_stuff["selling"]["inventory"].add_weapon(item_to_buy)
        else:
            print("not enough money")

    def __quantity(self,action,quantity):
        if (action == "Buy" and self.shop_stuff["selling"]["inventory"].money > 0
                or action == "Sell" and quantity > 1):
            print(f"How many would you like to {action.lower()}")
            quantity = input("")
        return quantity

    def __print_inventory(self, inventory_to_print):
        temp_item_list=[]
        index = 1
        print(f"Money: {self.shop_stuff["selling"]["inventory"].money}\n")
        for i, cons in inventory_to_print.items.items():
            print(
                f"{index}. {cons.name} | Price: {cons.price} | Restore amount: {cons.restorehealth} {"Quantity: " + str(cons.quantity) if cons.quantity else ""}")
            temp_item_list.append((cons.name, index, "consumable", cons.price, cons.quantity))
            index += 1
        print("\nWeapons:\n")
        for wep in inventory_to_print.weapons:
            if wep.type != "nyrkki":
                temp_item_list.append((wep, index, "weapon", 100,1))
                print(f"{index}. {wep.type}")
                index += 1
        return temp_item_list

# FOR TESTING BELOW
pl_inv=inventory.Inventory()
s=Shop(pl_inv)
pl_inv.add_weapon(Weapon("some",12,12))
pl_inv.add_item("apple")
pl_inv.add_item("meat")
print(*pl_inv.weapons)
s.shop()
print(*pl_inv.weapons)