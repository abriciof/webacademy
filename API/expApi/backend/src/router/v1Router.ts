import { Router } from "express";
import produtoRouter from "../resources/produto/produto.router";
import languageRouter from "../resources/language/language.router";
import usuarioRouter from "../resources/usuario/usuario.router";
import authRouter from "../resources/auth/auth.router";

const router = Router();

router.use('/', authRouter);
router.use("/produto", produtoRouter);
router.use("/usuario", usuarioRouter);
router.use("/language", languageRouter);

export default router;
