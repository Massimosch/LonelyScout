from player import Player
import random
from fight import Fight
from connectDB import yhteys

# initialize player, checkpoints, score
class Game:
    def __init__(self, player_name, main_menu, checkpoints, enemies):
        self.player = Player(player_name, 0)
        self.main_menu = main_menu
        self.checkpoints = checkpoints
        self.enemies = enemies
        self.scores = 0

    def start_game(self):
        while True:
            print(f"Sinä olet tässä: {self.checkpoints[self.player.position]}. Mitä sä haluat tehdä?")
            print("1. Siirry")
            print("2. Käy kaupassa")
            print("3. Vaihda ase")
            print("4. Käytä ")
            print("5. Go to main menu")

            valinta = input("Valitse vaihtoehto (1, 2, 3, 4, 5) :")

            if valinta == "1":
                # creating random enemy
                enemy = random.choice(self.enemies)
                #call fight
                fighting = Fight(self.player, enemy, self.main_menu)
                fighting.fighting()
                #if player win, he moves
                self.player.position += 1
            elif valinta == "2":
                pass
            elif valinta == "3":
                self.player.change_equip_weapon()
            elif valinta == "4":
                self.player.use_item()
            elif valinta == "5":
                self.main_menu.main_menu()

    def end_game(self):
        print("Game Ended with score : " + self.scores)

    def save_game(self):
        print('Running Save Game function')
        try:
            cursor = yhteys.cursor()
            sql = f'select id from game where player_name = {self.player.name}'
            cursor.execute(sql)
            have_save = cursor.fetchall()
            
            if have_save:
                sql = ""
            else:
                sql = ""
        
            cursor.execute()
            cursor.close()
            print(f"Game has been saved succesfully {self.player.name}")
        except yhteys.mysql.connector.Error as e:
            print("Error in saving function:", e)
            

    def load_game(self):
        print("Getting player data")
        try:
            cursor = yhteys.cursor()
            sql = f'select * from game where player_name = {self.player.name}'
            cursor.execute(sql)
            have_data = cursor.fetchall()
            
            if have_data:
                self.player.position = have_data["current_checkpoint"]
                self.player.health = have_data["health"]
                self.player.score = have_data["score"]
                #get checkpoints visited here
                print(f"game sucessfully loaded. {self.player.name} is at {self.player.position}")
            else:
                print("No saved game found")
            cursor.close()
        except yhteys.mysql.connector.Error as e:
            print("Error in load game function: ", e )