
CREATE TABLE IF NOT EXISTS `vote`.`users` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `code` VARCHAR(90) NOT NULL,
  `rank` INT NOT NULL DEFAULT 1000,
  `coins` INT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `idusers_UNIQUE` (`iduser` ASC))
ENGINE = InnoDB;
