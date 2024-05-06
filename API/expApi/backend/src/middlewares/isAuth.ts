import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const uid = req.session.uid;
    const tipoUsuarioId = req.session.tipoUsuarioId;
    if (uid && tipoUsuarioId) next();
    else res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Não autenticado, porfavor fazer login' });
};

export default isAuth;