import express, { Request, Response }from "express";
import validateEnv from "./utils/validateEnv";
import dotenv from "dotenv";
import router from "./router/router";
// import morgan from "morgan";
import logger from "./middlewares/logger";

// configurando env
dotenv.config({ path : 'envs/.env.development' });
validateEnv();
const PORT = process.env.PORT ?? 3333;

// publics
//const publicPath = `${process.cwd()}/public`;

// iniciando app
const app = express();

// middlewarer de log
app.use(logger('completo'));

// Router
app.use(router);

app.listen(PORT, ()=>{
    console.log(`Express rodando na porta ${PORT}. NODE_ENV: ${process.env.NODE_ENV}`);
});

