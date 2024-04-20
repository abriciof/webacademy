/*
  Warnings:

  - You are about to alter the column `ts_compra` on the `COMPRA` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `COMPRA` MODIFY `ts_compra` TIMESTAMP NOT NULL,
    MODIFY `desconto` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `PRODUTO` ADD COLUMN `id_compra` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `PRODUTO` ADD CONSTRAINT `PRODUTO_id_compra_fkey` FOREIGN KEY (`id_compra`) REFERENCES `COMPRA`(`id_compra`) ON DELETE SET NULL ON UPDATE CASCADE;
