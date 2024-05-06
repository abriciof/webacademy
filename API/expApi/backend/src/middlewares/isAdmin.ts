import { Request, Response, NextFunction } from 'express';
import { checkIsAdmin } from '../resources/auth/auth.service';
import { StatusCodes } from 'http-status-codes';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const uid = req.session.uid;
    const tipoUsuarioId = req.session.tipoUsuarioId;
    if (uid && tipoUsuarioId && await checkIsAdmin(tipoUsuarioId)) next();
    else res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Não autorizado' });
};

export default isAdmin;