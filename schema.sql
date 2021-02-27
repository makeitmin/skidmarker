CREATE TABLE IF NOT EXISTS `skidmarker`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(65) NOT NULL,
  `user_password` VARCHAR(128) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC))
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `skidmarker`.`certificate` (
  `certificate_id` INT NOT NULL AUTO_INCREMENT,
  `certificate_title` VARCHAR(45) NOT NULL,
  `certificate_detail` VARCHAR(256) NOT NULL,
  `certificate_date` DATETIME NOT NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`certificate_id`),
  INDEX `fk_certificate_user_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_certificate_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `skidmarker`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `skidmarker`.`competition` (
  `competition_id` INT NOT NULL AUTO_INCREMENT,
  `competition_title` VARCHAR(45) NOT NULL,
  `competition_detail` VARCHAR(256) NOT NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`competition_id`),
  INDEX `fk_competition_user1_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_competition_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `skidmarker`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `skidmarker`.`project` (
  `project_id` INT NOT NULL AUTO_INCREMENT,
  `project_title` VARCHAR(45) NOT NULL,
  `project_detail` VARCHAR(256) NOT NULL,
  `project_start` DATETIME NOT NULL,
  `project_end` DATETIME NOT NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`project_id`),
  INDEX `fk_project_user1_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_project_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `skidmarker`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `skidmarker`.`education` (
  `education_id` INT NOT NULL AUTO_INCREMENT,
  `school_name` VARCHAR(45) NOT NULL,
  `major` VARCHAR(45) NOT NULL,
  `degree` VARCHAR(45) NOT NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`education_id`),
  INDEX `fk_education_user1_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_education_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `skidmarker`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB