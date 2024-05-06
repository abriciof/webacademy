-- CreateTable
CREATE TABLE `itens_carrinho` (
    `id` CHAR(36) NOT NULL,
    `usuarioId` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_lista_compra` (
    `listaCompraId` CHAR(36) NOT NULL,
    `produtoId` CHAR(36) NOT NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`produtoId`, `listaCompraId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itens_carrinho` ADD CONSTRAINT `itens_carrinho_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_lista_compra` ADD CONSTRAINT `item_lista_compra_listaCompraId_fkey` FOREIGN KEY (`listaCompraId`) REFERENCES `itens_carrinho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_lista_compra` ADD CONSTRAINT `item_lista_compra_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
