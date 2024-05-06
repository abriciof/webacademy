import { Request, Response } from "express"
import { SignUpDto } from "./auth.types";
import { StatusCodes } from "http-status-codes";
import { createUsuario, checkEmailIsAvaliable} from "../usuario/usuario.service";
import { TipoUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { checkAuth } from "../auth/auth.service"
import { any } from "joi";


const signup = async (req: Request, res: Response) => {
    const usuario = req.body as SignUpDto;
    try {
        const emailIsAvaliable = await checkEmailIsAvaliable(usuario.email);
        if (!emailIsAvaliable) 
            return res.status(StatusCodes.CONFLICT).json({
                msg: 'Email informado já está sendo usado' 
            });

        const newUsuario = await createUsuario({
            nome: usuario.nome, 
            email: usuario.email,
            senha: usuario.senha,
            tipoUsuarioId: TipoUsuarios.CLIENT
        });
        
        res.status(StatusCodes.CREATED).json(newUsuario);
    
    } catch (e: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e.errors);
    }
};

const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
        const usuario = await checkAuth({ email, senha });

        if (!usuario)
            return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({
                msg: 'Email e/ou senha incorretos'
            });


        req.session.uid = usuario.id;
        req.session.tipoUsuarioId = usuario.tipoUsuarioId;
        
        res.status(StatusCodes.OK).json({ msg: 'Usuário autenticado' });

    } catch (err: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.errors);
    }

}
const logout = async (req: Request, res: Response) => {}

export default { signup, login, logout }