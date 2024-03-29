SET foreign_key_checks = 0;

-- -----------------------------------------------------
-- Schema street_art
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table USER
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(14) NOT NULL,
  `description` VARCHAR(255) NULL,
  `email` VARCHAR(45) NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `score` INT NOT NULL,
  `is_admin` TINYINT(1) NOT NULL,
  `is_banned` TINYINT(1) NOT NULL,
  `selected_avatar` LONGTEXT NOT NULL,
  `border` VARCHAR(7) NOT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table AVATAR_IMAGE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avatar_image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `objective` VARCHAR(300) NULL,  
  `img_url` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table AVATAR_USER
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `avatar_user` (
  `avatar_image_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`avatar_image_id`, `user_id`),
  INDEX `fk_avatar_image_has_User_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_avatar_image_has_User_avatar_image_idx` (`avatar_image_id` ASC) VISIBLE,
  CONSTRAINT `fk_avatar_image_has_User_avatar_image`
    FOREIGN KEY (`avatar_image_id`)
    REFERENCES `avatar_image` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_avatar_image_has_User_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table ARTIST
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `artist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(5000) NOT NULL,
  `image` LONGTEXT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table ARTWORK
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `artwork` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `image` LONGTEXT NOT NULL,
  `longitude` VARCHAR(30) NOT NULL,
  `latitude` VARCHAR(30) NOT NULL,
  `adress` LONGTEXT NOT NULL,
  `description` VARCHAR(500) NULL,
  `date_published` DATE NOT NULL,
  `ask_to_archived` TINYINT(1) NOT NULL,
  `is_archived` TINYINT(1) NOT NULL,
  `is_validate` TINYINT(1) NOT NULL,
    `publisher_id` INT,
  INDEX `fk_artwork_publisher1_idx` (`publisher_id` ASC) VISIBLE,
  CONSTRAINT `fk_artwork_publisher1`
    FOREIGN KEY (`publisher_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  `artist_id` INT,
  INDEX `fk_artwork_artist1_idx` (`artist_id` ASC) VISIBLE,
  CONSTRAINT `fk_artwork_artist1`
    FOREIGN KEY (`artist_id`)
    REFERENCES `artist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table PHOTO
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `photo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image` LONGTEXT NOT NULL,
  `is_validated` TINYINT(1) NOT NULL,
  `user_id` INT NOT NULL,
  `artwork_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_photo_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_photo_artwork1`
    FOREIGN KEY (`artwork_id`)
    REFERENCES `artwork` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
  );

-- -----------------------------------------------------
-- Table ARTICLE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(5000) NOT NULL,
  `image` LONGTEXT NULL,
  `is_archived` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`));

SET foreign_key_checks = 1;
