import { Router } from "express";
import produtoRouter from "../resources/produto/produto.router";
import languageRouter from "../resources/language/language.router";
import usuarioRouter from "../resources/usuario/usuario.router";
import authRouter from "../resources/auth/auth.router";
import compraRouter from "../resources/compra/compra.router"

const router = Router();

router.use('/', 
// #swagger.tags = ['Auth']
authRouter);

router.use("/produto", 
// #swagger.tags = ['Produto']
produtoRouter);

router.use("/usuario",
// #swagger.tags = ['Usuario']
usuarioRouter);

router.use('/compra', 
// #swagger.tags = ['Compra']
compraRouter);

router.use("/language", 
// #swagger.tags = ['Language']
languageRouter);

export default router;
