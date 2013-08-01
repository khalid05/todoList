CREATE SCHEMA IF NOT EXISTS `todolist` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

USE todolist;

DROP TABLE `tasks`;
CREATE  TABLE `tasks` (
  `idtask` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL DEFAULT 'Sans nom' ,
  `endDate` DATETIME NULL ,
  `status` TINYINT NOT NULL DEFAULT 0 ,
  PRIMARY KEY (`idtask`) )
ENGINE = InnoDB;

INSERT INTO `tasks` (`idtask`, `name`, `status`) VALUES (1, 'Acheter du lait', 0);
INSERT INTO `tasks` (`idtask`, `name`, `status`) VALUES (2, 'Acheter du chocolat', 0);
INSERT INTO `tasks` (`idtask`, `name`, `status`) VALUES (3, 'Acheter un tracteur', 0);
INSERT INTO `tasks` (`idtask`, `name`, `status`) VALUES (4, 'Rendre son DVD à Max.', 1);
