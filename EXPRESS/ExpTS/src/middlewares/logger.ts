import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import * as fs from 'fs';
dotenv.config({path: 'envs/.env.development'})
const caminhoLog = `${process.env.LOGS}/server.log`;

function logger(tipo: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (tipo === 'simples') {
        const mensagem = `\n${new Date().toISOString()} ${req.url} ${req.method}`;
        fs.appendFile(
            caminhoLog,
            mensagem,
            function () {
              console.log(mensagem.substring(3));
            },
          );
      } else {
        fs.appendFile(
            caminhoLog,
            `\n${new Date().toISOString()} ${req.url} ${req.method} ${
              req.httpVersion
            } ${req.get('User-Agent')}`,
            function (err) {
              if (err) console.log(err);
            },
          );

        
      }
  
      next();
    };
  }

export default logger;
  