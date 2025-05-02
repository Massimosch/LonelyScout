CREATE DATABASE LonelyScout;
USE LonelyScout;

CREATE TABLE checkpoint (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
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

CREATE TABLE checkpointVisited (
    game_id INT,
    checkpoint_id INT,
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (checkpoint_id) REFERENCES checkpoint(id)
);


CREATE TABLE enemy (
    enemy_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    damage INT NOT NULL,
    weakness VARCHAR(255),
    health INT NOT NULL
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

INSERT INTO enemy (name, damage, weakness, health) VALUES
('goblin', 3, "sword", 30),
('rogue', 5, "magic", 40),
('slime', 2, "hand", 20);

INSERT INTO consumables (name, sale_value, heal_amount) VALUES
('parantava juoma', 30, 25),
('nakki', 2, 5),
('piirakka', 20, 15);

INSERT INTO weapons (name, type, sale_value, damage, durability) VALUES
('steel sword', 'sword', 250, 100, 10),
('slingshot', 'ranged', 100, 50, 10),
('bow', 'ranged', 150, 50, 10),
('magic staff', 'magic', 175, 60, 10);

INSERT INTO checkpoint (name) VALUES
('Kotikylä'),
('Vuoristokylä'),
('Synkkämetsä'),
('Sumuinen laakso'),
('Lohikäärmeiden syvänne'),
('Rauniot'),
('Sademetsä');
