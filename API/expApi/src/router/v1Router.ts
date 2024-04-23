import { Router } from "express";
import produtoRouter from "../resources/produto/produto.router";
import languageRouter from "../resources/language/language.router";

const router = Router();

router.use("/produto", produtoRouter);
router.use("/language", languageRouter);

export default router;
