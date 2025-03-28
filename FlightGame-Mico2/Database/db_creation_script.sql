CREATE DATABASE LonelyScoutDB;
USE LonelyScoutDB;

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
    FOREIGN KEY (current_checkpoint) REFERENCES checkpoint(id)
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
    description TEXT
);

CREATE TABLE event_actions (
    action_id INT PRIMARY KEY AUTO_INCREMENT,
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
    game_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_type ENUM('weapon', 'consumable') NOT NULL,
    current_durability INT,
    PRIMARY KEY (game_id, item_name),
    FOREIGN KEY (game_id) REFERENCES game(id)
);

INSERT INTO event (type, description) VALUES
('merchant', 'Saavut vanhan miehen luokse, hän huutaa sinulle. "Täällä kannattaisi pysähtyä!", pistäydyt miehen luokse ja hyllyt notkuvat erilaisia tavaroita.'),
('enemy', 'Jouduimme taisteluun!');

INSERT INTO enemy (name, damage, weakness, health) VALUES
('goblin', 3, "sword", 30),
('rogue', 5, "magic", 40),
('slime', 2, "hand", 20);

INSERT INTO consumable (name, sale_value, heal_amount) VALUES
('parantava juoma', 30, 25),
('nakki', 2, 5),
('piirakka', 20, 15);

INSERT INTO weapon (name, type, sale_value, damage, durability) VALUES
('steel sword', 'sword', 250, 100, 10),
('slingshot', 'ranged', 100, 50, 10),
('bow', 'ranged', 150, 50, 10),
('magic staff', 'magic', 175, 60, 10);

INSERT INTO checkpoint (name, x, y) VALUES
('Kotikylä', 0, 0),
('Vuoristokylä', 3, 3),
('Synkkämetsä', 4, 7),
('Sumuinen laakso', 5,10),
('Lohikäärmeiden syvänne', 8, 12),
('Rauniot', 10, 10),
('Sademetsä', 14, 14);
