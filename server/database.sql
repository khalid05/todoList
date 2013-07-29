CREATE SCHEMA `todolist` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

CREATE  TABLE `todolist`.`tasks` (
  `idtask` INT NOT NULL ,
  `name` VARCHAR(45) NOT NULL DEFAULT 'Sans nom' ,
  `endDate` DATETIME NULL ,
  `status` TINYINT NOT NULL DEFAULT 0 ,
  PRIMARY KEY (`idtask`) )
ENGINE = InnoDB;

INSERT INTO `todolist`.`tasks` (`idtask`, `name`, `status`) VALUES (1, 'Acheter du lait', 0);
INSERT INTO `todolist`.`tasks` (`idtask`, `name`, `status`) VALUES (2, 'Acheter du chocolat', 0);
INSERT INTO `todolist`.`tasks` (`idtask`, `name`, `status`) VALUES (3, 'Acheter un tracteur', 0);
INSERT INTO `todolist`.`tasks` (`idtask`, `name`, `status`) VALUES (4, 'Rendre son DVD à Max.', 1);
