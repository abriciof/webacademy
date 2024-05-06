import { Router } from "express";
import produtoController from "./produto.controller";
import validateBody from "../../middlewares/validateBody";
import schema from "./produto.schemas";
import isAdmin from '../../middlewares/isAdmin';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get("/", produtoController.index);
router.post("/", isAuth, isAdmin, validateBody(schema), produtoController.create);
router.get("/:id", produtoController.read);
router.put("/:id", isAuth, isAdmin, validateBody(schema), produtoController.update);
router.delete("/:id", isAuth, isAdmin, produtoController.remove);

export default router;