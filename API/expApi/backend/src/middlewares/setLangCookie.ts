import { NextFunction, Request, Response } from "express";

const setCookieLang = (req: Request, res: Response, next: NextFunction) => {
    if (!('lang' in req.cookies)) {
        res.cookie('lang', process.env.DEFAULT_LANG, {path: '/produto'});
    }
    next();
}

export default setCookieLang;