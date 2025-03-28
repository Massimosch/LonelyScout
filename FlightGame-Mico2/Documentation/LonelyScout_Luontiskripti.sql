CREATE DATABASE LonelyScout;
USE LonelyScout;

CREATE TABLE checkpoint (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            map_id INT,
                            position_x FLOAT,
                            position_y FLOAT,
                            FOREIGN KEY (map_id) REFERENCES map(id)
);

CREATE TABLE event (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       checkpoint_id INT,
                       event_type ENUM('Reward', 'EnemyAmbush', 'Merchant', 'Problem') NOT NULL,
                       description TEXT,
                       resource_id INT,
                       amount INT,
                       merchant_name VARCHAT(100),
                       problem_description TEXT,
                       FOREIGN KEY (checkpoint_id) REFERENCES checkpoint(id),
                       FOREIGN KEY (resource_id) REFERENCES resource(id)
);

CREATE TABLE player (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100)
);

CREATE TABLE map (
                     id INT AUTO_INCREMENT PRIMARY KEY,
                     map_name VARCHAR(100) NOT NULL,
                     image_path VARCHAR(255) NOT NULL
);

CREATE TABLE settings (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          player_id INT,
                          playtime INT,
                          difficulty ENUM('Easy', 'Normal', 'Hard'),
                          FOREIGN KEY (player_id) REFERENCES player(id)
);

CREATE TABLE inventory (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           player_id INT,
                           resource_id INT,
                           amount INT DEFAULT 1,
                           FOREIGN KEY (player_id) REFERENCES player(id),
                           FOREIGN KEY (resource_id) REFERENCES resource(id)
);

CREATE TABLE resource (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100),
                          description VARCHAR(250),
                          resource_type VARCHAR(50),
                          price INT
);

