import { Request, Response } from "express"
import { SignUpDto } from "./auth.types";
import { StatusCodes } from "http-status-codes";
import { createUsuario, checkEmailIsAvaliable} from "../usuario/usuario.service";
import { TipoUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { checkAuth } from "../auth/auth.service"
import { any } from "joi";


const signup = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Cria uma conta de usuário.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/SingUp' }
    }
    #swagger.responses[200] = {
        schema: { msg: 'Usuário criado com sucesso, faça login' }
    }
    #swagger.responses[409] = {
        schema: { msg: 'Email informado já está sendo usado' }
    }
    */
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
        
        res.status(StatusCodes.CREATED).json({
            msg: "Usuário criado com sucesso, faça login"
        });
    
    } catch (e: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e.errors);
    }
};

const login = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Inicia Sessão uma conta de usuário.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/Login' }
    }
    #swagger.responses[200] = {
        schema: { msg: 'Usuário autenticado' }
    }
    #swagger.responses[401] = {
        schema: { msg: 'Email e/ou senha incorretos' }
    }
    */
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
const logout = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Finaliza Sessão uma conta de usuário autenticado.'
    #swagger.responses[200] = {
        schema: { msg: 'Logout feito com sucesso' }
    }
    */

    try{
        req.session.destroy(()=>{
            res.status(StatusCodes.OK).json({ msg: 'Logout feito com sucesso' });
        });
    }catch(err: any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.errors);
    }

}

export default { signup, login, logout }