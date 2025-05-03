import database
import json


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

def get_game(player_name):
    #q = f"SELECT * FROM game WHERE player_name = '{player_name}' AND is_ended IS FALSE"
    query = f"""SELECT game.*, checkpoint.name as checkpoint_name FROM game LEFT JOIN checkpoint ON game.current_checkpoint = checkpoint.id
                WHERE game.player_name = '{player_name}' AND game.is_ended is FALSE"""
    player_data = exequte_this_query(query)
    return player_data

def update_game(id, current_checkpoint, health, score, is_ended):
    update_query = f"UPDATE game SET current_checkpoint = {current_checkpoint}, health = {health}, score = {score}, is_ended = {is_ended} WHERE id = {id}"
    exequte_this_query(update_query)

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
    if result:
        return result[0]['id']
    return None

def get_checkpoints():
    q_for_checkpoints = "SELECT * FROM checkpoint"
    checkpoints = exequte_this_query(q_for_checkpoints)
    print(checkpoints)
    return checkpoints

def get_consumables(game_id): #funktio, joka tekee consumables listan
    q=f"""Select item_id, name, heal_amount, quantity 
          from  consumable_Inventory inner join consumables on consumable_Inventory.item_id=consumables.id
          WHERE consumable_Inventory.game_id={game_id}"""
    consumables=exequte_this_query(q)
    return consumables

def get_weapons(game_id):
    q = f"""Select item_id, name, type, sale_value, damage, current_durability, durability
              from  weapon_Inventory inner join weapons on weapon_Inventory.item_id=weapons.id
              WHERE weapon_Inventory.game_id={game_id}"""
    weapons = exequte_this_query(q)
    return weapons


print(get_weapons(1))


