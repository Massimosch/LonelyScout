from flask import Flask, request, jsonify
from flask_cors import CORS
import lonely_scout_backend_functions
app = Flask(__name__)
CORS(app) ##Cross Origin Resource Sharing, when Javascript works in different port we need this.

@app.route('/load_game/<player_name>')
def load_game(player_name):
    result = lonely_scout_backend_functions.get_game(player_name)
    res_consumables = lonely_scout_backend_functions.get_consumables(player_name)
    if not result:
        ##korjaa palautus järkevämmäksi.
        return result, 404
    return {'player_state': result[0], 'consumables': res_consumables, 'weapons': None}

@app.route('/save_game/<game_id>', methods=['POST'])
def save_game(game_id):
    last_checkpoint = lonely_scout_backend_functions.get_last_checkpoint()
    print(last_checkpoint)
    args = request.args
    current_checkpoint_id = int(args.get("current_checkpoint_id"))
    health = int(args.get("health"))
    score = int(args.get("score"))
    is_ended = True if current_checkpoint_id == last_checkpoint else False
    lonely_scout_backend_functions.update_game(game_id, current_checkpoint_id, health, score, is_ended)
    return '', 200

@app.route('/new_game/<player_name>', methods=['POST'])
def start_new_game(player_name):
    result = lonely_scout_backend_functions.get_game(player_name)
    if len(result) > 0:
        lonely_scout_backend_functions.delete_game(player_name)
    checkpoints = lonely_scout_backend_functions.get_checkpoints()
    current_checkpoint = lonely_scout_backend_functions.get_checkpoints()[0]['id'] #to get the first checkpoint id
    print(current_checkpoint)
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

@app.route('/move/<player_name>')
def move_to_checkpoint(player_name):
    result = lonely_scout_backend_functions.move_to_checkpoint(player_name)
    return result


if __name__ == '__main__':
    app.run(port=8000, debug=True)