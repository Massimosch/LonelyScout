import database

def exequte_this_query(query):
    cursor = database.yhteys.cursor(dictionary=True)
    try:
        cursor.execute(query)
        response = cursor.fetchall()
    except database.mysql.connector.Error as e:
        print(f"Virhe: {e}")
        response =  f'ERROR HAUSSA {query}'
    finally:
        cursor.close()
    return response

def get_game_state(player_name):
    q = f"SELECT * FROM game WHERE player_name = '{player_name}'"
    result = exequte_this_query(q)
    print(result)
    return result

def create_new_game_state(player_name):
    ##TARKISTUS ONKO PELAAJA NIMELLÄ OLEMASSA TALLENNUS
    query = f"SELECT * FROM game WHERE player_name = '{player_name}'"
    result = exequte_this_query(query)
    if result:
        return False
    
    insert_query = f"""INSERT INTO game 
    (player_name, current_checkpoint, health, score, is_ended)
    VALUES ('{player_name}', 1, 100, 0, false)
    """
    response = exequte_this_query(insert_query)
    return response

#input = input("Anna nimi: ")
#get_game_state(input)

