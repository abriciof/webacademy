import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
import { createLink } from './utils/links.mjs';

// Lendo do .env
const NODE_ENV = process.env.NODE_ENV;

// windows
const caminho_env_windows = `.\\envs\\.env.${NODE_ENV}`;

// linux
const caminho_env_linux = `./envs/.env.${NODE_ENV}`
dotenv.config({ path : caminho_env_windows });
const PORT = process.env.PORT ?? 3333;

console.log(NODE_ENV);
console.log(caminho_env_windows);
console.log(PORT);


// Lendo dos argumentos
let diretorio = "src/"+process.argv[2];

// Servidor que lista arquivos (Parte 1)
const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        res.write(`<h1>Server HTTP do Fabrício</h1>`);
        res.write(`<p>Node Env: ${NODE_ENV}<br>Port: ${PORT} </p>`);
        if (diretorio){
            res.write(`<h2>Diretório: ${diretorio}</h2>`);
            fs.readdir(diretorio, (err, arquivos) => {
                if (err) {
                    const erro_texto = "<h2 style='color: red;'>Erro ao listar arquivos: " + err.message + '</h2>';
                    res.write(erro_texto);
                }else{
                    res.write('<ul>');
                    arquivos.forEach(arquivo => {
                        res.write(`<li>${createLink(arquivo)}</li>`);
                        //res.write(links(arquivo))
                    });
                    res.write('</ul>');
                }
                res.end();
            });
        }else{
            res.write("<h2 style='color: red;'>Erro ao listar arquivos: Insira um diretório como argumento</h2>");
            res.end();
        }
    }else if (req.url.includes('favicon')){
        res.end();
    }else{
        let arquivo = `${diretorio}${req.url}`;
        console.log(arquivo);
        fs.readFile(arquivo, (err, data) => {
            if (err) throw new Error(err);
            res.write("<a href='/'>Voltar</a><br>");
            res.write(`<pre>${data.toString()}</pre>`);
            res.end();
        })
    }
});

server.listen(PORT);
