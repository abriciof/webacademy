import { Router } from 'express';
import compraController from './compra.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.post('/', isAuth, compraController.addItemCarrinho);
router.get('/efetuar', isAuth, compraController.efetuarCarrinho);

export default router;