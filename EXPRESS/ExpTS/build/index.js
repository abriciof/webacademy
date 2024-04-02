"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const dotenv_1 = __importDefault(require("dotenv"));
// configurando env
dotenv_1.default.config({ path: 'envs/.env.development' });
(0, validateEnv_1.default)();
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
    console.log(`Express rodando na porta ${PORT}. NODE_ENV: ${process.env.NODE_ENV}`);
});
