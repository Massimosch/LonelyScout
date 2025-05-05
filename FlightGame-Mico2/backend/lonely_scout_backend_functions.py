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

def update_game(id, current_checkpoint, health, score, is_ended, consumables, weapons):
    update_query = f"UPDATE game SET current_checkpoint = {current_checkpoint}, health = {health}, score = {score}, is_ended = {is_ended} WHERE id = {id}"
    exequte_this_query(update_query)
    if len(consumables) > 0:
        update_consumable_Inventory(id, consumables)
    if len(weapons) > 0:
        update_weapon_Inventory(id, weapons)


def update_consumable_Inventory(game_id, consumables):
    for item in consumables:
        food = exequte_this_query(f"SELECT * FROM consumable_Inventory WHERE game_id={game_id} AND item_id={item['item_id']}")
        if len(food)>0:
            if item["quantity"] == 0:
                exequte_this_query(f"DELETE FROM consumable_Inventory WHERE game_id = {game_id} AND item_id = {item['item_id']}")
            else:
                update_food = f"UPDATE consumable_Inventory SET quantity = {item['quantity']} WHERE game_id = {game_id} AND item_id = {item['item_id']}"
                exequte_this_query(update_food)
        else:
            insert_food = f"INSERT INTO consumable_Inventory (game_id, item_id, quantity) VALUES('{game_id}', {item['item_id']}, {item['quantity']})"
            exequte_this_query(insert_food)

def update_weapon_Inventory(game_id, weapons):
    # I am checking, if some old weapon was lost in the game, I delete from db
    # get_old_weapons = exequte_this_query(f"SELECT id FROM weapon_Inventory WHERE game_id={game_id}")
    # id_list = [item["id"] for item in weapons if "id" in item]
    # for item in get_old_weapons:
    #     if item not in id_list:
    #         exequte_this_query(f"DELETE FROM weapon_Inventory WHERE id = '{item}'")

    for item in weapons:
        if 'id' in item:
            if item['current_durability'] == 0:
                exequte_this_query(f"DELETE FROM weapon_Inventory WHERE id = {item['id']}")
            else:
                update_weapon = f"UPDATE weapon_Inventory SET current_durability = {item['current_durability']} WHERE id = {item['id']}"
                exequte_this_query(update_weapon)
        else:
            insert_weapon = f"INSERT INTO weapon_Inventory (game_id, item_id, current_durability) VALUES('{game_id}', {item['item_id']}, {item['current_durability']})"
            exequte_this_query(insert_weapon)

def start_new_game(player_name, current_checkpoint, health, score):
    insert_query = f"INSERT INTO game (player_name, current_checkpoint, health, score) VALUES('{player_name}', {current_checkpoint}, {health}, {score})"
    exequte_this_query(insert_query)
    response = get_game(player_name)
    return response

def delete_game(game_id):
    delete_query = f"DELETE FROM game WHERE id = '{game_id}'"
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
    q = f"""Select weapon_Inventory.id, item_id, name, type, sale_value, damage, current_durability, durability
              from  weapon_Inventory inner join weapons on weapon_Inventory.item_id=weapons.id
              WHERE weapon_Inventory.game_id={game_id}"""
    weapons = exequte_this_query(q)
    return weapons

def get_best_scores():
    q = f"SELECT player_name, score FROM game WHERE is_ended=1 ORDER BY score DESC LIMIT 10"
    result = exequte_this_query(q)
    return result
