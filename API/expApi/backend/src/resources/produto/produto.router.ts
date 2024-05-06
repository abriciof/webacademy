import { Router } from "express";
import produtoController from "./produto.controller";
import validateBody from "../../middlewares/validateBody";
import schema from "./produto.schemas";
import isAdmin from '../../middlewares/isAdmin';

const router = Router();

router.get("/", produtoController.index);
router.post("/", isAdmin, validateBody(schema), produtoController.create);
router.get("/:id", produtoController.read);
router.put("/:id", isAdmin, validateBody(schema), produtoController.update);
router.delete("/:id", isAdmin, produtoController.remove);

export default router;