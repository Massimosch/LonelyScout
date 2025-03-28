from inventory import Inventory
from weapon import Weapon

class Player:
    def __init__(self, player_name, position):
        self.name = player_name
        self.health = 100
        self.inventory = Inventory()
        self.equip_weapon = self.inventory.weapons[0] #player can attack only by fist in the beginning
        self.position = position

    def attack(self, target):
        self.equip_weapon.use()
        if self.equip_weapon.durability <= 0:
            self.inventory.remove_weapon(self.equip_weapon)
            print("Ase tuhoutui. Valitse uusi.")
            self.change_equip_weapon()
        damage = self.equip_weapon.damage
        weapon_type = self.equip_weapon.type
        target.take_damage(damage, weapon_type)

    def change_equip_weapon(self):
        print("Voit valita: ",)
        [print(f"[{i+1}] {weapon.type}") for i, weapon in enumerate(self.inventory.weapons)]
        while True:
            new_weapon = int(input("Valitse vaihtoehdon numero: "))
            if new_weapon in range(1, len(self.inventory.weapons)+2):
                self.equip_weapon = self.inventory.weapons[new_weapon-1]
                print("Sinun uusi ase on", self.equip_weapon.type)
                break
            else:
                print("Vaihtoehdon numero on väärin")

    def die(self):
        #peli loppuu, score counting
        print(f"{self.name} on kukistettu!")

    #copy from enemy class
    def take_damage(self, damage):
        self.health -= damage
        print(f"{self.name} sai {damage} vahinkoa. (HP: {self.health})")
        if self.health <= 0:
            self.die()

    def move(self,position):
        #moving=input(f"Haluatho mennä {position}? \n [1] Kyllä \n [2] Ei")
        self.position = position

    def use_item(self):
        print("Your items in inventory")
        for item in self.inventory.items.values():
            print(f"{item.name} healthrestore:{item.restorehealth} quantity:{item.quantity}")
        item=input("Anna item nimi: ")
        self.health += self.inventory.items[item].restorehealth
        self.inventory.remove_item(item)
        print(f"Now you health is {self.health}")



# I tested functions: change_equip_weapon and attack in player, add_weapon and remove_weapon in Inventory
def test():
    p = Player("Test", (100, 100))
    weapon = Weapon('keppi', 10, 5)
    print("my weapons", p.inventory.weapons)
    p.inventory.add_weapon(weapon)
    p.change_equip_weapon()
    p.attack()
    p.attack()
    p.attack()
    p.attack()
    p.attack()
