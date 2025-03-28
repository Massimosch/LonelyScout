/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE IF NOT EXISTS `checkpoint` (
                                            `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `x` int(11) NOT NULL,
    `y` int(11) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO `checkpoint` (`id`, `name`, `x`, `y`) VALUES
                                                      (1, 'Kotikylä', 0, 0),
                                                      (2, 'Vuoristokylä', 3, 3),
                                                      (3, 'Synkkämetsä', 4, 7),
                                                      (4, 'Sumuinen laakso', 5, 10),
                                                      (5, 'Lohikäärmeiden syvänne', 8, 12),
                                                      (6, 'Rauniot', 10, 10),
                                                      (7, 'Sademetsä', 14, 14);

CREATE TABLE IF NOT EXISTS `consumable` (
                                            `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `sale_value` int(11) NOT NULL,
    `heal_amount` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO `consumable` (`id`, `name`, `sale_value`, `heal_amount`) VALUES
                                                                         (1, 'parantava juoma', 30, 25),
                                                                         (2, 'nakki', 2, 5),
                                                                         (3, 'piirakka', 20, 15);

CREATE TABLE IF NOT EXISTS `enemy` (
                                       `enemy_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `damage` int(11) NOT NULL,
    `weakness` varchar(255) DEFAULT NULL,
    `health` int(11) NOT NULL,
    PRIMARY KEY (`enemy_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO `enemy` (`enemy_id`, `name`, `damage`, `weakness`, `health`) VALUES
                                                                             (1, 'goblin', 3, 'sword', 30),
                                                                             (2, 'rogue', 5, 'magic', 40),
                                                                             (3, 'slime', 2, 'hand', 20);

CREATE TABLE IF NOT EXISTS `event` (
                                       `id` int(11) NOT NULL AUTO_INCREMENT,
    `type` varchar(255) NOT NULL,
    `description` text DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO `event` (`id`, `type`, `description`) VALUES
                                                      (1, 'merchant', 'Saavut vanhan miehen luokse, hän huutaa sinulle. "Täällä kannattaisi pysähtyä!", pistäydyt miehen luokse ja hyllyt notkuvat erilaisia tavaroita.'),
                                                      (2, 'enemy', 'Jouduimme taisteluun!');

CREATE TABLE IF NOT EXISTS `event_actions` (
                                               `action_id` int(11) NOT NULL AUTO_INCREMENT,
    `event_id` int(11) NOT NULL,
    `action_description` text NOT NULL,
    PRIMARY KEY (`action_id`),
    KEY `event_id` (`event_id`),
    CONSTRAINT `event_actions_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


CREATE TABLE IF NOT EXISTS `game` (
                                      `id` int(11) NOT NULL AUTO_INCREMENT,
    `player_name` varchar(10) NOT NULL,
    `current_checkpoint` int(11) DEFAULT NULL,
    `health` int(11) NOT NULL,
    `score` int(11) NOT NULL,
    `checkpoints_visited` text DEFAULT NULL,
    `is_ended` tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    KEY `current_checkpoint` (`current_checkpoint`),
    CONSTRAINT `game_ibfk_1` FOREIGN KEY (`current_checkpoint`) REFERENCES `checkpoint` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


CREATE TABLE IF NOT EXISTS `inventory` (
                                           `game_id` int(11) NOT NULL,
    `item_name` varchar(255) NOT NULL,
    `item_type` enum('weapon','consumable') NOT NULL,
    `current_durability` int(11) DEFAULT NULL,
    PRIMARY KEY (`game_id`,`item_name`),
    CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


CREATE TABLE IF NOT EXISTS `weapon` (
                                        `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `type` varchar(255) NOT NULL,
    `sale_value` int(11) NOT NULL,
    `damage` int(11) NOT NULL,
    `durability` int(11) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO `weapon` (`id`, `name`, `type`, `sale_value`, `damage`, `durability`) VALUES
                                                                                      (1, 'steel sword', 'sword', 250, 100, 10),
                                                                                      (2, 'slingshot', 'ranged', 100, 50, 10),
                                                                                      (3, 'bow', 'ranged', 150, 50, 10),
                                                                                      (4, 'magic staff', 'magic', 175, 60, 10);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
