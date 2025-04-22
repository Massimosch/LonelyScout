CREATE DATABASE LonelyScout;
USE DATABASE LonelyScout;

CREATE TABLE checkpoint (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
);

CREATE TABLE checkpointVisited (
    game_id INT,
    checkpoint_id INT,
    FOREIGN KEY game_id REFERENCES game(id),
    FOREIGN KEY (checkpoint_id) REFERENCES checkpoint(id)
);

CREATE TABLE game (
    id INT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(10) NOT NULL,
    current_checkpoint INT,
    health INT NOT NULL,
    score INT NOT NULL,
    is_ended BOOLEAN NOT NULL DEFAULT FALSE,
	FOREIGN KEY (current_checkpoint) REFERENCES checkpoint(id)
);

CREATE TABLE enemy (
    enemy_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    damage INT NOT NULL,
    weakness VARCHAR(255),
    health INT NOT NULL
);

CREATE TABLE weapon_Inventory (
    game_id INT,
    item_id INT,
    current_durability INT,
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (item_id) REFERENCES weapons(id)
);

CREATE TABLE consumable_Inventory (
    game_id INT,
    item_id INT,
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (item_id) REFERENCES consumables(id)
);

CREATE TABLE weapons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    sale_value INT NOT NULL,
    damage INT NOT NULL,
    durability INT NOT NULL
);

CREATE TABLE consumables (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    sale_value INT NOT NULL,
    heal_amount INT
);


