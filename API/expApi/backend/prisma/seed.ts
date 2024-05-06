import { PrismaClient } from "@prisma/client";
import { TipoUsuarios } from "../src/resources/tipoUsuario/tipoUsuario.constants";

const prisma = new PrismaClient();

const seed = async () => {
    await prisma.tipoUsuario.createMany({ data: [
        { id: TipoUsuarios.ADMIN, rotulo: 'admin' },
        { id: TipoUsuarios.CLIENT, rotulo: 'client' },
    ]})
}


seed().then(() => {
    prisma.$disconnect();
})