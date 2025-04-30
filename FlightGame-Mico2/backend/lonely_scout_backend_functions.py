import database


def exequte_this_query(query):
    cursor = database.yhteys.cursor(dictionary=True)
    try:
        cursor.execute(query)
        response = cursor.fetchall()
    except database.mysql.connector.Error as e:
        print(f"Virhe: {e}")
        response = f'ERROR HAUSSA {query}'
    finally:
        cursor.close()
    return response

## Tällä queryllä saahaan checkpointin nimi........ se olisi hyvä olla "get gamessa"..
##SELECT checkpoint.name FROM game join checkpoint ON game.current_checkpoint = checkpoint.id WHERE game.player_name = '{player_name}'

def get_game(player_name):
    #q = f"SELECT * FROM game WHERE player_name = '{player_name}' AND is_ended IS FALSE"
    query = f"""SELECT game.*, checkpoint.name as checkpoint_name FROM game LEFT JOIN checkpoint ON game.current_checkpoint = checkpoint.id
                WHERE game.player_name = '{player_name}'"""
    player_data = exequte_this_query(query)
    consumable_data = get_consumables(player_name)
    result = [player_data, consumable_data]
    return result
    

def update_game(player_name, current_checkpoint, health, score, is_ended):
    update_query = f"UPDATE game SET current_checkpoint = {current_checkpoint}, health = {health}, score = {score}, is_ended = {is_ended} WHERE player_name = '{player_name}' AND is_ended IS FALSE"
    result = exequte_this_query(update_query)
    return result

def start_new_game(player_name, current_checkpoint, health, score):
    insert_query = f"INSERT INTO game (player_name, current_checkpoint, health, score) VALUES('{player_name}', {current_checkpoint}, {health}, {score})"
    exequte_this_query(insert_query)
    response = get_game(player_name)
    return response

def delete_game(player_name):
    delete_query = f"DELETE FROM game WHERE player_name = '{player_name}' AND is_ended IS FALSE"
    exequte_this_query(delete_query)

def get_random_enemy():
    q_for_enemy = f"SELECT * FROM enemy ORDER BY RAND() LIMIT 1"
    enemy = exequte_this_query(q_for_enemy)
    return enemy

def get_last_checkpoint():
    q = f"SELECT id FROM checkpoint ORDER BY id DESC LIMIT 1"
    result = exequte_this_query(q)

def get_checkpoints():
    q_for_checkpoints = "SELECT * FROM checkpoint"
    checkpoints = exequte_this_query(q_for_checkpoints)
    print(checkpoints)
    return checkpoints

def get_consumables(player_name): #funktio, joka tekee consumables listan
    q=f"""Select name, sale_value, heal_amount, count(*) as 'quantity' 
          from game inner join consumable_inventory on game.id=consumable_Inventory.game_id
          inner join consumables on consumable_Inventory.item_id=consumables.id
          WHERE game.player_name='{player_name}'
          GROUP BY consumables.name"""
    consumables=exequte_this_query(q)
    return consumables
