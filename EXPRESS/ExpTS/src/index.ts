import express, { Request, Response } from "express";
import validateEnv from "./utils/ValidateEnv";
import dotenv from "dotenv";

// configurando env
dotenv.config({ path : 'envs/.env.development' });
validateEnv();
const PORT = process.env.PORT ?? 3333;

// iniciando app
const app = express()

app.get("/", (req: Request,res: Response) => {
    res.send("Hello World!");
    res.end();
});

app.get("/produtos", (req: Request,res: Response) => {
    res.send("Acessando Produtos");
})

app.post("/", (req: Request,res: Response) => {
    res.send("Método POST na '/'");
});

app.listen(PORT, ()=>{
    console.log(`Express rodando na porta ${PORT}. NODE_ENV: ${process.env.NODE_ENV}`);
});

