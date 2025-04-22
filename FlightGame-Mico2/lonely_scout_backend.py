import database
import json

def exequte_this_query(query):
    cursor = database.yhteys.cursor()
    try:
        cursor.execute(query)
        response = cursor.fetchall()
    except database.mysql.connector.Error as e:
        print(f"Virhe: {e}")
        response =  f'ERROR HAUSSA {query}'
    finally:
        cursor.close()
    return json.dumps(response)

def get_game_state(player_name):
    q = f"SELECT * FROM game WHERE player_name = '{player_name}'"
    result = exequte_this_query(q)
    print(result)
    return result

input = input("Anna nimi: ")
get_game_state(input)

