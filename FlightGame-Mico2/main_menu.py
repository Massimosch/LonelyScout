import sys
from game import Game
from player import Player

class MainMenu:
    def __init__(self):
        self.player_name = None

    def main_menu(self):
        while True:
            print("Lonely Scout Strategia Peli")
            print("1. Aloita Peli")
            print("2. Lataa Peli")
            print("3. Ohjeet")
            print("4. Poistu Pelistä")

            valinta = input("Valitse vaihtoehto (1, 2, 3 tai 4) : ")

            if valinta == "1":
                self.aloita_peli()
                return
            elif valinta == "2":
                print("Ladataan peli.")
                Game.load_game()
            elif valinta == "3":
                self.ohjeet()
            elif valinta == "4":
                Game.save_game()
                print("Poistutaan pelistä! Näkemiin!")
                sys.exit()
            else:
                print("Virhe valinnassa. Käytithän valintaan numeroita? (1,2,3 tai 4)")


    def aloita_peli(self):
        self.player_name = input("\nSyötä pelaajan nimi: ") ##SYÖTÄ PELAAJALLE NIMI

    def ohjeet(self):
        print("\nPelin Ohjeet: ")
        print("Olet tiedustelija joka seikkailee saarella."
              "vastassasi on erillaisia tapahtumia ja tehtävänäsi on kerätä resursseja.\n"
              "Mutta ole varovainen joissakin paikoissa saattaa olla vaarallisia Vihollisia.")
        input("\n Paina mitä vain näppäintä palataksesi Main Menuun.")