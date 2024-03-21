const express = require("express");
const dotenv = require("dotenv");

// configurando env
const NODE_ENV = process.env.NODE_ENV;
dotenv.config({ path : `envs/.env.${NODE_ENV}` });
const PORT = process.env.PORT ?? 3333;

// iniciando app
app = express()

app.get("/", (req,res)=>{
    res.send("Hello World!");
});

app.get("/produtos", (req,res)=>{
    res.send("Acessando Produtos");
})

app.post("/", (req,res)=>{
    res.send("Método POST na '/'");
});

app.listen(PORT, ()=>{
    console.log(`Express rodando na porta ${PORT}. NODE_ENV: ${NODE_ENV}`);
});