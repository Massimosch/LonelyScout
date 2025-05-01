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
    q=f"""Select name, heal_amount, count(*) as 'quantity' 
          from  consumable_Inventory inner join consumables on consumable_Inventory.item_id=consumables.id
          WHERE consumable_Inventory.game_id={game_id} 
          GROUP BY consumables.name"""
    consumables=exequte_this_query(q)
    return consumables

def move_to_checkpoint(player_name):
    player_data = get_game(player_name)
    if not player_data:
        return {"message": 'Pelaaja tietoja ei löydy'}, 404
    
    game_id = player_data[0]['id']
    current_checkpoint = player_data[0]['current_checkpoint']
    last_checkpoint = get_last_checkpoint()
    
    if current_checkpoint < last_checkpoint:
        new_checkpoint = current_checkpoint + 1
        update_game(player_data[0]['id'], new_checkpoint, player_data[0]['health'], player_data[0]['score'], False)
        return {"message": "Taisteluun Battle.html!"}, 200
    else:
        update_game(game_id, current_checkpoint, 100, player_data[0]['score'], True)
        return {"message": "Game end logix here.."}, 200