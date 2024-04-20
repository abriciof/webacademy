/*
  Warnings:

  - You are about to alter the column `ts_compra` on the `Compra` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Compra` MODIFY `ts_compra` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Endereco` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;
