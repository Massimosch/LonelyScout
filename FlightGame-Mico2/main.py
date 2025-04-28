import main_menu
from game import Game
from connectDB import create_checkpoints, create_enemies
import enemy
import weapon

##LUODAAN OLIO MENUSTA JA AJETAAN SE
Menu = main_menu.MainMenu()
Menu.main_menu()

checkpoints = create_checkpoints()
enemies = create_enemies()
#create game pass from menu player name
game = Game(Menu.player_name, Menu, checkpoints, enemies)
game.start_game()





##ENEMYN GOBLIN LUONTI##
#goblin = enemy.CreateEnemy("goblin", 50, 10,"sword")

##PELAAJA OBJEKTIN LUONTI
#player = main_menu.Player(Menu.player_name, (0,0))

##MIEKKA ITEM OBJEKTIN LUONTI JA LISÄÄMINEN PELAAJALLE
#sword = weapon.Weapon("sword", 10, 10)
#player.inventory.add_weapon(sword)

## GAME LOOP TÄNNE #################
#while True:
#    valinta = input(f"Kohtasit {goblin.name.title()}!! Mitä teet? (Attack or Flee?)")
#    if valinta == "Attack":
#        player.change_equip_weapon()
#        player.attack(goblin)
#    elif valinta == "Flee":
#        print("Paettiin Place4stä, takaisin Place1")
####################################


