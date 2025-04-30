from os import getenv
import mysql.connector
from dotenv import load_dotenv
from enemy import CreateEnemy
from checkpoint import Checkpoint

load_dotenv()

yhteys = mysql.connector.connect(
         host=getenv('DB_HOST'),
         user=getenv('DB_USER'),
         port= getenv('DB_PORT'),
         database=getenv('DB_DATABASE'),
         password=getenv('DB_PASSWORD'),
         collation='utf8mb4_general_ci',
         autocommit=True
         )

def get_checkpoints():
    sql = 'select name from checkpoint'
    cursor = yhteys.cursor()
    cursor.execute(sql)

    result = cursor.fetchall()
    cursor.close()
    return result

def create_checkpoints():
    checkpoints = []
    result_from_db = get_checkpoints()
    for line in result_from_db:
        #name = line
        #checkpoint = checkpoint(name)
        checkpoint = line
        checkpoints.append(checkpoint)
    return checkpoints

def get_enemies():
    sql = 'select name, damage, weakness, health from enemy'
    cursor = yhteys.cursor()
    cursor.execute(sql)

    result = cursor.fetchall()
    cursor.close()
    return result

def create_enemies():
    enemies = []
    result_from_db = get_enemies()
    for line in result_from_db:
        name, attack_power, weakness, health =line
        enemy = CreateEnemy(name, attack_power, weakness, health)
        enemies.append(enemy)
    return enemies


print(create_checkpoints())
print(create_enemies())