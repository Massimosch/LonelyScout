from os import getenv
import mysql.connector
from dotenv import load_dotenv

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