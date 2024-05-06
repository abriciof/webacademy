import express, { Request, Response} from "express";
import dotenv from "dotenv";
import validateEnv from "./utils/validateEnv";
import router from "./router"
import cookieParser from "cookie-parser";
import setCookieLang from "./middlewares/setLangCookie"
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import { ItemCarrinhoDto } from "./resources/compra/compra.type";

declare module "express-session" {
    interface SessionData {
        uid: string
        tipoUsuarioId: string
        carrinho: ItemCarrinhoDto[]
    }
}

dotenv.config();    

validateEnv();

const app = express();
const PORT = process.env.PORT ?? 4444;

app.use(cookieParser());
app.use(session({
    genid: (req) => uuidv4(),
    secret: 'Hi9Cf#mK98$ad!@asdDf1S02#2A1!2',
    resave: true,
    saveUninitialized: true
}));

app.use(setCookieLang);
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});