import { Router } from "express";
import validateBody from "../../middlewares/validateBody";
import usuarioController from "./usuario.controller"
import schema from "./usuario.schemas";
import isAdmin from '../../middlewares/isAdmin';


const router = Router();

router.get('/', usuarioController.index);
router.post('/', isAdmin, validateBody(schema), usuarioController.create);
router.get('/:id', usuarioController.read);
router.put('/:id', isAdmin, validateBody(schema), usuarioController.update);
router.delete('/:id', isAdmin, usuarioController.remove);

export default router;
