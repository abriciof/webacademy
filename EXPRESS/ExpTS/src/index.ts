import express from "express";
import validateEnv from "./utils/validateEnv";
import dotenv from "dotenv";
import router from "./router/router";
import { engine } from "express-handlebars";
import logger from "./middlewares/logger";
import sass from 'node-sass-middleware';

// configurando env
dotenv.config({ path : 'envs/.env.development' });

// ValideEnv
validateEnv();

// iniciando app
const app = express();
const PORT = process.env.PORT || 3333;

// Handlebars
app.engine(
    "handlebars", 
    engine({
        helpers: require(`${__dirname}/views/helpers/helpers.ts`),
        defaultLayout: 'main'
    }),
);

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

// SASS
app.use(
    sass({
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`,
    outputStyle: "compressed",
    prefix: "/css",
   }),
);
   
// Log
app.use(logger('simples'));

// urlencoded
app.use(express.urlencoded({extended: false}));

// Router
app.use(router);

console.log(__dirname)

app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/js", express.static(`${__dirname}/public/js`));
app.use("/html", express.static(`${__dirname}/public/html`));
app.use("/img", express.static(`${__dirname}/public/img`));



app.listen(PORT, ()=>{
    console.log(`Express rodando na porta ${PORT}. NODE_ENV: ${process.env.NODE_ENV}`);
});

