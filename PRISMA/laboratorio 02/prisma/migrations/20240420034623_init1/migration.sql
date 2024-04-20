-- CreateTable
CREATE TABLE `ENDERECO` (
    `id` INTEGER NOT NULL,
    `rua` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `cidade` VARCHAR(100) NOT NULL,
    `uf` VARCHAR(2) NOT NULL,
    `cep` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CLIENTE` (
    `cpf` VARCHAR(11) NOT NULL,
    `id_endereco` INTEGER NOT NULL,
    `nome_completo` VARCHAR(100) NOT NULL,
    `celular` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `data_nascimento` DATE NOT NULL,

    UNIQUE INDEX `CLIENTE_cpf_id_endereco_key`(`cpf`, `id_endereco`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SUBCATEGORIA` (
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`nome`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CATEGORIA` (
    `nome` VARCHAR(100) NOT NULL,
    `nome_subcategoria` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CATEGORIA_nome_nome_subcategoria_key`(`nome`, `nome_subcategoria`),
    PRIMARY KEY (`nome`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MODELO` (
    `id_modelo` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `numero_serie` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id_modelo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PRODUTO` (
    `codigo` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `modelo` INTEGER NOT NULL,
    `fabricante` VARCHAR(100) NOT NULL,
    `preco_base` DECIMAL(10, 2) NOT NULL,
    `quantidade_disponivel` INTEGER NOT NULL,
    `categoria` VARCHAR(100) NOT NULL,
    `subcategoria` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `COMPRA` (
    `id_compra` INTEGER NOT NULL,
    `ts_compra` TIMESTAMP NOT NULL,
    `desconto` DECIMAL(10, 2) NOT NULL,
    `forma_pagamento` VARCHAR(100) NOT NULL,
    `total_compra` DECIMAL(10, 2) NOT NULL,
    `cpf_cliente` VARCHAR(191) NOT NULL,
    `endereco_cliente` INTEGER NOT NULL,

    PRIMARY KEY (`id_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CLIENTE` ADD CONSTRAINT `CLIENTE_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `ENDERECO`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CATEGORIA` ADD CONSTRAINT `CATEGORIA_nome_subcategoria_fkey` FOREIGN KEY (`nome_subcategoria`) REFERENCES `SUBCATEGORIA`(`nome`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PRODUTO` ADD CONSTRAINT `PRODUTO_modelo_fkey` FOREIGN KEY (`modelo`) REFERENCES `MODELO`(`id_modelo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PRODUTO` ADD CONSTRAINT `PRODUTO_categoria_subcategoria_fkey` FOREIGN KEY (`categoria`, `subcategoria`) REFERENCES `CATEGORIA`(`nome`, `nome_subcategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `COMPRA` ADD CONSTRAINT `COMPRA_cpf_cliente_endereco_cliente_fkey` FOREIGN KEY (`cpf_cliente`, `endereco_cliente`) REFERENCES `CLIENTE`(`cpf`, `id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;
