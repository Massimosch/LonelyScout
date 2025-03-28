CREATE DATABASE LonelyScout;
USE DATABASE LonelyScout;

CREATE TABLE checkpoint (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    x INT NOT NULL,
    y INT NOT NULL
);

CREATE TABLE game (
    id INT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(10) NOT NULL,
    current_checkpoint INT,
    health INT NOT NULL,
    score INT NOT NULL,
    checkpoints_visited TEXT,
    is_ended BOOLEAN NOT NULL DEFAULT FALSE,
	FOREIGN KEY current_checkpoint REFERENCES checkpoint(id)
);

CREATE TABLE enemy (
    enemy_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    damage INT NOT NULL,
    weakness VARCHAR(255),
    health INT NOT NULL
);

CREATE TABLE event (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL,
    description TEXT,
);

CREATE TABLE event_actions (
	action_id PRIMARY KEY AUTO_INCREMENT,
	event_id INT NOT NULL,
	action_description TEXT NOT NULL,
	FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE weapon (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    sale_value INT NOT NULL,
    damage INT NOT NULL,
    durability INT NOT NULL
);

CREATE TABLE consumable (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    sale_value INT NOT NULL,
    heal_amount INT
);

CREATE TABLE inventory (
    game_id INT,
    item_name VARCHAR(255),
	item_type ENUM('weapon', 'consumable') NOT NULL,
    current_durability INT,
    PRIMARY KEY (game_id, item_name),
    FOREIGN KEY (game_id) REFERENCES game(id)
);
