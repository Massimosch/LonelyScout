from weapon import Weapon
from item import itemsanakirja
from copy import deepcopy

#mb later should implement Singleton pattern since the player can have only one Inventory
class Inventory:
    def __init__(self):
        #player always has fist, the fist's durability is endless
        weapon = Weapon('nyrkki', 5, float('inf'))
        self.weapons = [weapon]
        self.money = 0
        self.items={}

    def add_weapon(self, weapon):
        self.weapons.append(weapon)

    def remove_weapon(self):
        self.weapons = [weapon for weapon in self.weapons if weapon.durability > 0]

    def add_item(self,name):
        if name in self.items:
            self.items[name].quantity+=1
        else:
            self.items[name]=deepcopy(itemsanakirja[name])
            self.items[name].quantity=1
        print(f"Now you have {self.items[name].quantity} {self.items[name].name}")

    def remove_item(self,name):
        if name in self.items:
            self.items[name].quantity -= 1
            if self.items[name].quantity!=0:
                print(f"Now you have {self.items[name].quantity} {self.items[name].name}")
            else:
                print(f"Now you have {self.items[name].quantity} {self.items[name].name}")
                del self.items[name]
        else:
            print("No such item")