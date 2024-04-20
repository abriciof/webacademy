import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createEndereco() {
    const endereco = await prisma.endereco.create({
        data: {
            id: 2,
            rua: "Rua das Flores",
            numero: "123",
            cidade: "São Paulo",
            uf: "SP",
            cep: "01234-567"
        }
    });
    console.log('Endereço criado:', endereco);
    return endereco;
}

async function createCliente(idEndereco: number) {
    const cliente = await prisma.cliente.create({
        data: {
            cpf: "12345678901",
            nome_completo: "Fabricio Guimaraes",
            celular: "11999999999",
            email: "john.doe@example.com",
            data_nascimento: new Date("2001-03-10"),
            id_endereco: idEndereco
        }
    });
    console.log("----------------CREATE;----------------");
    console.log('Cliente criado:', cliente);
    console.log('\n');
    return cliente;
}

async function readCliente(cpf: string) {
    const cliente = await prisma.cliente.findUnique({
        where: { cpf }
    });
    console.log("\n----------------READ----------------");
    console.log('Dados do Cliente:', cliente);
    console.log('\n');

}

async function updateCliente(cpf: string, email?: string, celular?: string) {
    let updatedCliente;
    if (email){
        if (celular) {
            updatedCliente = await prisma.cliente.update({
                where: { cpf },
                data: { email: email, 
                    celular: celular
                 }
            });
        }
    }
    console.log("\n----------------UPDATE----------------");
    console.log('Cliente atualizado:', updatedCliente);
    console.log('\n');

}

async function deleteCliente(cpf: string) {
    const deletedCliente = await prisma.cliente.delete({
        where: { cpf }
    });
    console.log("\n----------------DELETE----------------");
    console.log('Cliente deletado:', deletedCliente);
    console.log('\n');
}

async function main() {
    // Cria um endereço e retorna o objeto criado (necessário um cliente ter um endereço)
    const endereco = await createEndereco(); 

    // Cria um cliente usando o id do endereço criado
    const cliente = await createCliente(endereco.id);  
    
    // Ler os dados do cliente
    await readCliente(cliente.cpf);

    // Altera dados do cliente
    await updateCliente(cliente.cpf, "fdcg@icomp.ufam.edu.br", "99293686125");

    // Remove o cliente do banco
    await deleteCliente(cliente.cpf);
}

main()
    .catch(e => {
        console.error('Error:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
