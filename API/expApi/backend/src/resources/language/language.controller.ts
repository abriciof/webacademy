import { Request, Response } from "express";
import { ChangeLangDto } from "./language.type";
import { StatusCodes } from "http-status-codes";

const changeLanguage = (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Muda a linguagem da aplicação.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/Language' }
    }
    */
    const lang = req.body as ChangeLangDto;
    res.cookie('lang', lang.lang, { path: '/produto' });
    res.status(StatusCodes.NO_CONTENT).json();
}

export default { changeLanguage };