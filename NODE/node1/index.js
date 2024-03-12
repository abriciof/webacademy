const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv');

// Lendo do .env
const NODE_ENV = process.env.NODE_ENV;
const caminho_env = `.\\envs\\.env.${NODE_ENV}`;
dotenv.config({ path : caminho_env });
const PORT = process.env.PORT ?? 3333;

console.log(NODE_ENV);
console.log(caminho_env);
console.log(PORT);


// Lendo dos argumentos
const diretorio = process.argv[2];

// Servidor que lista arquivos (Parte 1)
const server = http.createServer((req, res) => {
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
                    res.write(`<li>${arquivo}</li>`);
                });
                res.write('</ul>');
            }
            res.end();
        });
    }else{
        res.write("<h2 style='color: red;'>Erro ao listar arquivos: Insira um diretório como argumento</h2>");
        res.end();
    }
   
});

server.listen(PORT);
