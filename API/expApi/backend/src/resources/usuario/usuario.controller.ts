import { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CreateUsuarioDto, UpdateUsuarioDto } from "./usuario.types";
import { checkEmailIsAvaliable, createUsuario, listUsuarios, readUsuario, updateUsuario, deleteUsuario } from "./usuario.service";


const index  = async (req: Request, res: Response) => {
     /*
    #swagger.summary = 'Recupera os dados de todos os usuários da base'
    */
    const skip = req.query.skip ? parseInt(req.query.skip?.toString()) : undefined;
    const take = req.query.take ? parseInt(req.query.take?.toString()) : undefined;
    try {
        const usuarios = await listUsuarios(skip, take);
        res.status(StatusCodes.OK).json(usuarios);
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const create = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Adiciona um novo usuário na base.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateUsuarioDto' }
    }
    */
    const usuario = req.body as CreateUsuarioDto;
    try {
        if (await checkEmailIsAvaliable(usuario.email)){
            const novoUsuario = await createUsuario(usuario);
            res.status(StatusCodes.CREATED).json(novoUsuario);
        }else{
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
        }
    } catch (err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const read = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de um usuário específico.'
    #swagger.parameters['id'] = { description: 'ID do usuário' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/CreateUsuarioDto' }
    }
    */
    const { id } = req.params;
    try {
        const usuario = await readUsuario(id);
        if (!usuario){
            return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        }
        res.status(StatusCodes.OK).json(usuario);
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const update = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Atualiza dados de um usuário específico.'
    #swagger.parameters['id'] = { description: 'ID do usuário' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateUsuarioDto' }
    }
    */
    const { id } = req.params;
    const usuario = req.body as UpdateUsuarioDto;
    try {
        if (await checkEmailIsAvaliable(usuario.email, id)) {
            const updatedUsuario = await updateUsuario(id, usuario);
            res.status(StatusCodes.NO_CONTENT).json(updatedUsuario);
        } else{
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
        }
    } catch (err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }

};

const remove = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Remove um usuário da base.'
    #swagger.parameters['id'] = { description: 'ID do usuário' }
    */
    const { id } = req.params;
    console.log(id);
    try {
        const deletedUsuario = await deleteUsuario(id);
        console.log(deletedUsuario);
        res.status(StatusCodes.NO_CONTENT).json(deletedUsuario); 
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

export default { index, create, read, update, remove};

