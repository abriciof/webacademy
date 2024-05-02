import { PrismaClient, Produto } from "@prisma/client";
import { CreateProdutoDto, UpdateProdutoDto } from "./produto.types";


const prisma = new PrismaClient();

export const checkNomeIsAvaliable = async (nome: string, ignoredId?: string): Promise<boolean> => {
    const produto = await prisma.produto.findUnique({ where: {nome} });
    if (!produto) return true;
    if (ignoredId && produto.id === ignoredId) return true;
    return false;
}

export const createProduto = async (produto: CreateProdutoDto): Promise<Produto> => {
    return await prisma.produto.create({ data: produto });
};

export const listProdutos = async(skip?: number, take?: number): Promise<Produto[]> => {
    return await prisma.produto.findMany({ skip, take});
}

export const readProduto = async(id: string): Promise<Produto | null> => {
    return await prisma.produto.findUnique({ where: {id} });
}

export const updateProduto = async(id: string, produto: UpdateProdutoDto): Promise<Produto> => {
    return await prisma.produto.update({ data: produto, where: {id} });
}

export const deleteProduto = async(id: string): Promise<Produto> => {
    return await prisma.produto.delete({ where: {id} });
}