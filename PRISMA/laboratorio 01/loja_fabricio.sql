-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema loja
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema loja
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `loja` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `loja` ;

-- -----------------------------------------------------
-- Table `loja`.`SUBCATEGORIA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja`.`SUBCATEGORIA` (
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`nome`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja`.`CATEGORIA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja`.`CATEGORIA` (
  `nome` VARCHAR(100) NOT NULL,
  `nome_subcategoria` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`nome`, `nome_subcategoria`),
  INDEX `nome_subcategoria` (`nome_subcategoria` ASC) VISIBLE,
  CONSTRAINT `CATEGORIA_ibfk_1`
    FOREIGN KEY (`nome_subcategoria`)
    REFERENCES `loja`.`SUBCATEGORIA` (`nome`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja`.`ENDERECO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja`.`ENDERECO` (
  `id` INT NOT NULL,
  `rua` VARCHAR(100) NULL DEFAULT NULL,
  `numero` VARCHAR(10) NULL DEFAULT NULL,
  `cidade` VARCHAR(100) NULL DEFAULT NULL,
  `uf` VARCHAR(2) NULL DEFAULT NULL,
  `cep` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja`.`CLIENTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja`.`CLIENTE` (
  `cpf` VARCHAR(11) NOT NULL,
  `nome_completo` VARCHAR(100) NULL DEFAULT NULL,
  `celular` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `data_nascimento` DATE NULL DEFAULT NULL,
  `id_endereco` INT NOT NULL,
  PRIMARY KEY (`cpf`, `id_endereco`),
  INDEX `id_endereco` (`id_endereco` ASC) VISIBLE,
  CONSTRAINT `CLIENTE_ibfk_1`
    FOREIGN KEY (`id_endereco`)
    REFERENCES `loja`.`ENDERECO` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja`.`COMPRA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja`.`COMPRA` (
  `id_compra` INT NOT NULL,
  `ts_compra` TIMESTAMP NULL DEFAULT NULL,
  `desconto` DECIMAL(10,2) NULL DEFAULT NULL,
  `forma_pagamento` VARCHAR(100) NULL DEFAULT NULL,
  `total_compra` DECIMAL(10,2) NULL DEFAULT NULL,
  `cpf_cliente` VARCHAR(11) NULL DEFAULT NULL,
  `endereco_cliente` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_compra`),
  INDEX `cpf_cliente` (`cpf_cliente` ASC, `endereco_cliente` ASC) VISIBLE,
  CONSTRAINT `COMPRA_ibfk_1`
    FOREIGN KEY (`cpf_cliente` , `endereco_cliente`)
    REFERENCES `loja`.`CLIENTE` (`cpf` , `id_endereco`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja`.`MODELO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja`.`MODELO` (
  `id_modelo` INT NOT NULL,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `numero_serie` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id_modelo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja`.`PRODUTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja`.`PRODUTO` (
  `codigo` INT NOT NULL,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `modelo` INT NULL DEFAULT NULL,
  `fabricante` VARCHAR(100) NULL DEFAULT NULL,
  `preco_base` DECIMAL(10,2) NULL DEFAULT NULL,
  `quantidade_disponivel` INT NULL DEFAULT NULL,
  `categoria` VARCHAR(100) NULL DEFAULT NULL,
  `subcategoria` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  INDEX `modelo` (`modelo` ASC) VISIBLE,
  INDEX `categoria` (`categoria` ASC, `subcategoria` ASC) VISIBLE,
  CONSTRAINT `PRODUTO_ibfk_1`
    FOREIGN KEY (`modelo`)
    REFERENCES `loja`.`MODELO` (`id_modelo`),
  CONSTRAINT `PRODUTO_ibfk_2`
    FOREIGN KEY (`categoria` , `subcategoria`)
    REFERENCES `loja`.`CATEGORIA` (`nome` , `nome_subcategoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
