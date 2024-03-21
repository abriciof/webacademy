"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// configurando env
const NODE_ENV = process.env.NODE_ENV;
dotenv_1.default.config({ path: `envs/.env.${NODE_ENV}` });
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3333;
// iniciando app
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello World!");
    res.end();
});
app.get("/produtos", (req, res) => {
    res.send("Acessando Produtos");
});
app.post("/", (req, res) => {
    res.send("Método POST na '/'");
});
app.listen(PORT, () => {
    console.log(`Express rodando na porta ${PORT}. NODE_ENV: ${NODE_ENV}`);
});

