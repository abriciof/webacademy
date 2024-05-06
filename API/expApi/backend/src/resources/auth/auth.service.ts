import { PrismaClient, Usuario } from "@prisma/client";
import { LoginDto } from "./auth.types";
import bcrypt from 'bcryptjs';
import { any } from "joi";


const prisma = new PrismaClient();

export const checkAuth = async(credenciais: LoginDto): Promise<Usuario | any> => {
    const { email, senha } = credenciais;
    const usuario = await prisma.usuario.findFirst({ where: { email } });
    if (!usuario) return null;
    const ok = await bcrypt.compare(senha, usuario.senha);
    if (ok) return usuario;
}

export const checkIsAdmin = async(id: string): Promise<Boolean> => {
    if (id){
        const tipoUsuario = await prisma.tipoUsuario.findUnique({ where: { id }})
        if (tipoUsuario?.rotulo == 'admin') return true;
    }
    return false;
}