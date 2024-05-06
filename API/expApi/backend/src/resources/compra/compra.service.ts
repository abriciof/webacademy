import { PrismaClient, Compra, ItemListaCompra } from "@prisma/client";
import { CreateCompraDto } from "./compra.type";


const prisma = new PrismaClient();

export const createCompra = async ( compra : CreateCompraDto): Promise<Compra> => {
    return await prisma.compra.create({ data : compra });
};


export const createItemCarrinho = async ( itemListaCompra : ItemListaCompra): Promise<ItemListaCompra> => {
    return await prisma.itemListaCompra.create({ data : itemListaCompra });
};

