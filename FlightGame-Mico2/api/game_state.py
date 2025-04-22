from flask import Flask
from lonely_scout_backend import get_game_state
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

@app.route('/game_state/<player_name>')
def game_state(player_name):
    result = get_game_state(player_name)
    return result

if __name__ == '__main__':
    app.run(port=3006, debug=True)