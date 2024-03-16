import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
import loremIpsum from 'lorem-ipsum';

// Lendo do .env

// linux
dotenv.config();
const PORT = process.env.PORT ?? 3333;
console.log(PORT);

// Gerador de paragrafos
const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        fs.readFile("templates/index.html", 'utf8', (err, data)=>{
            if (err) throw new Error(err);
            const resultado = data.replace('{{resultado}}', '');
            res.end(resultado);
        });
    }else if (req.url.includes('resultado')){
        let paragrafos = '';
        const quantidade = parseInt(req.url.split('?quantidade=')[1]);

        if (quantidade){
            paragrafos = loremIpsum.loremIpsum({count: quantidade, units: 'paragraphs', suffix:'<br><br>'});
            paragrafos = `<p>${paragrafos}</p>`;
        }
        
        fs.readFile("templates/index.html", 'utf8', (err, data)=>{
            if (err) throw new Error(err);
            const resultado = data.replace('{{resultado}}', paragrafos);
            res.end(resultado);
        });

    }else{
        req.statusCode = 404;
        res.end('not found');
    }
});

server.listen(PORT);
