from flask import Flask, request, jsonify
from flask_cors import CORS
import lonely_scout_backend_functions
app = Flask(__name__)
CORS(app) ##Cross Origin Resource Sharing, when Javascript works in different port we need this.

@app.route('/load_game/<player_name>')
def load_game(player_name):
    game_data={}
    result = lonely_scout_backend_functions.get_game(player_name)
    if not result:
        ##korjaa palautus järkevämmäksi.
        return result, 404
    game_data["player_stats"] = result[0]
    game_id = game_data["player_stats"]["id"]
    consumables=lonely_scout_backend_functions.get_consumables(game_id)
    game_data["consumables"]=consumables
    weapons = lonely_scout_backend_functions.get_weapons(game_id)
    game_data["weapons"]=weapons
    return game_data

@app.route('/save_game/<game_id>', methods=['POST'])
def save_game(game_id):
    last_checkpoint = lonely_scout_backend_functions.get_last_checkpoint()[0]["id"]
    data = request.json
# we don't need player name because we dont' change it
    current_checkpoint_id = int(data["player_stats"]["current_checkpoint_id"])
    if current_checkpoint_id > last_checkpoint:
        current_checkpoint_id = last_checkpoint
    health = int(data["player_stats"]["health"])
    score = int(data["player_stats"]["score"])
    is_ended = data["is_ended"]
#    if player wants to save the second unfinished game, the first one is deleted
    if is_ended == False:
        unfinished_games = lonely_scout_backend_functions.get_game(data["player_stats"]["player"])
        for unfinished_game in unfinished_games:
            if unfinished_game["id"] != int(game_id):
                lonely_scout_backend_functions.delete_weapon_Inventory(unfinished_game["id"])
                lonely_scout_backend_functions.delete_consumable_Inventory(unfinished_game["id"])
                lonely_scout_backend_functions.delete_game(unfinished_game["id"])
    consumables = data["consumables"]
    weapons = data["weapons"]
    lonely_scout_backend_functions.update_game(int(game_id), current_checkpoint_id, health, score, is_ended, consumables, weapons)
    return '', 200

@app.route('/new_game/<player_name>', methods=['POST'])
def start_new_game(player_name):
    unfinished_games = lonely_scout_backend_functions.get_game(player_name)
    for unfinished_game in unfinished_games:
        lonely_scout_backend_functions.delete_weapon_Inventory(unfinished_game["id"])
        lonely_scout_backend_functions.delete_consumable_Inventory(unfinished_game["id"])
        lonely_scout_backend_functions.delete_game(unfinished_game["id"])
    # checkpoints = lonely_scout_backend_functions.get_checkpoints()
    current_checkpoint = lonely_scout_backend_functions.get_checkpoints()[0]['id'] #to get the first checkpoint id
    result = lonely_scout_backend_functions.start_new_game(player_name, current_checkpoint, 100, 0)
    return result

@app.route('/get_checkpoints')
def get_checkpoint():
    result = lonely_scout_backend_functions.get_checkpoints()
    return result

@app.route('/get_random_enemy')
def get_random_enemy():
    result = lonely_scout_backend_functions.get_random_enemy()
    return result

@app.route('/best_scores/<game_id>')
def get_best_scores(game_id):
    result = lonely_scout_backend_functions.get_best_scores(game_id)
    return result

@app.route('/get_shop_items')
def get_shop_items():
    result = lonely_scout_backend_functions.get_shop_items()
    return result

@app.route('/get_last_checkpoint')
def get_last_checkpoint():
    result = lonely_scout_backend_functions.get_last_checkpoint()
    print(result)
    return result[0]

if __name__ == '__main__':
    app.run(port=8000, debug=True)