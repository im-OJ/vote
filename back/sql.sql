
CREATE TABLE IF NOT EXISTS `vote`.`users` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `code` VARCHAR(90) NOT NULL,
  `rank` INT NOT NULL DEFAULT 1000,
  `coins` INT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `idusers_UNIQUE` (`iduser` ASC))
ENGINE = InnoDB;


CREATE TABLE `vote`.`posts` (
   `idpost` INT NOT NULL AUTO_INCREMENT ,
   `iduser` INT NOT NULL ,
   `time` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL ,
   `rank` INT NOT NULL DEFAULT '1000' ,
   `URL` VARCHAR(50) NOT NULL ,
   PRIMARY KEY (`idpost`))
   ENGINE = InnoDB;
