import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
    info: {
        title: "API da Loja virtual",
        description: "Documentação da API",
    },
    host: `${process.env.HOST}:${process.env.PORT}`,
    definitions: {
        CreateProdutoDto: {
            nome: "Martelo",
            preco: 29.0,
            estoque: 10,
        },
        Produto: {
            id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
            nome: "Bacon",
            preco: 261,
            estoque: 1,
            createdAt: "2023-11-07T19:27:15.645Z",
            updatedAt: "2023-11-07T19:27:15.645Z",
        },
        Language: {
            "lang": "en-US"
        },
        SingUp: {
            "email": "fabricio@email.com",
            "nome": "Fabricio Guimaraes",
            "senha": "senha123"
        },
        Login: {
            "email": "fabricio@email.com",
            "senha": "senha123"
        },
        ItemCarrinho: {
            "produtoId": "7f1086d7-794e-4d91-ac34-307413ee7b03",
            "quantidade": 123
        },
        CreateUsuarioDto: {
            "nome": "admin",
            "email": "admin@admin.com",
            "senha": "admin",
            "tipoUsuarioId": "7f1086d7-794e-4d91-ac34-307413ee7b03"
        }
       
           
    }
};

const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];

swaggerAutogen()(outputFile, routes, doc);