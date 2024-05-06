import { PrismaClient, Usuario } from "@prisma/client";
import { CreateUsuarioDto, UpdateUsuarioDto } from "./usuario.types";
import  bcrypt from "bcryptjs"


const prisma = new PrismaClient();

export const checkEmailIsAvaliable = async (email: string, ignoredId?: string): Promise<boolean> => {
    const usuario = await prisma.usuario.findUnique({ where: {email} });
    if (!usuario) return true;
    if (ignoredId && usuario.id === ignoredId) return true;
    return false;
}

export const createUsuario = async (usuario: CreateUsuarioDto): Promise<Usuario> => {
    const rounds = 10
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(usuario.senha, salt);
    usuario.senha = hash;
    return await prisma.usuario.create({ data: usuario });
};

export const listUsuarios = async(skip?: number, take?: number): Promise<Usuario[]> => {
    return await prisma.usuario.findMany({ skip, take});
}

export const readUsuario = async(id: string): Promise<Usuario | null> => {
    return await prisma.usuario.findUnique({ where: {id} });
}

export const updateUsuario = async(id: string, usuario: UpdateUsuarioDto): Promise<Usuario> => {
    const rounds = 10
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(usuario.senha, salt);
    usuario.senha = hash;
    return await prisma.usuario.update({ data: usuario, where: {id} });
}

export const deleteUsuario = async(id: string): Promise<Usuario> => {
    return await prisma.usuario.delete({ where: {id} });
}