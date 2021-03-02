-- -----------------------------------------------------
-- Schema skidmarker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `skidmarker` DEFAULT CHARACTER SET utf8 ;
USE `skidmarker` ;

-- -----------------------------------------------------
-- Table `skidmarker`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skidmarker`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_email_UNIQUE` (`email` ASC));


-- -----------------------------------------------------
-- Table `skidmarker`.`education`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skidmarker`.`education` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `univ_name` VARCHAR(45) NOT NULL,
  `major` VARCHAR(45) NOT NULL,
  `degree` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_education_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_education_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `skidmarker`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `skidmarker`.`award`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skidmarker`.`award` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `detail` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_competition_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_competition_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `skidmarker`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `skidmarker`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skidmarker`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `detail` VARCHAR(255) NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_project_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_project_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `skidmarker`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `skidmarker`.`certificate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skidmarker`.`certificate` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `detail` VARCHAR(255) NOT NULL,
  `acq_date` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_certificate_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_certificate_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `skidmarker`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);