class Fight:
    def __init__(self, player, enemy, main_menu):
        self.player = player
        self.enemy = enemy
        self.main_menu = main_menu

    def fighting(self):
        while True:
            print(f"start fighting with enemy {self.enemy.name}. His weakness is {self.enemy.weakness}")
            print("1. attack")
            print("2. change weapon")
            print("3. heal")
            print("4. main menu")

            valinta = input("Valitse vaihtoehto (1, 2, 3 tai 4) : ")

            if valinta == "1":
                self.player.attack(self.enemy)
                if self.enemy.health <= 0:
                    #getting reward
                    break
                elif self.enemy.health > 0:
                    self.enemy.attack(self.player)
                elif self.player.health <= 0:
                    self.player.die()
                else:
                    continue

            elif valinta == "2":
                self.player.change_equip_weapon()

            elif valinta == "3":
                self.player.use_item()

            elif valinta == "4":
                self.main_menu.main_menu()