from flask import Flask
from flask_cors import CORS
import lonely_scout_backend_functions
app = Flask(__name__)
CORS(app) ##Cross Origin Resource Sharing, when Javascript works in different port we need this.

@app.route('/game_state/<player_name>')
def game_state(player_name):
    result = lonely_scout_backend_functions.get_game_state(player_name)
    if not result:
        ##korjaa palautus järkevämmäksi.
        return result, 404
    return result

@app.route('/new_game/<player_name>')
def start_game(player_name):
    result = lonely_scout_backend_functions.create_new_game_state(player_name)
    if result is False:
        ##korjaa palautus järkevämmäksi.
        return "Nimikäytössä", 404
    return result



if __name__ == '__main__':
    app.run(port=8000, debug=True)