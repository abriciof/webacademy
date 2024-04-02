import { Router } from 'express';
import { loremIpsum } from 'lorem-ipsum';
const router = Router();

// MAIN Controller
router.get("/", (req ,res) => {
    res.send("Hello World!");
});

router.post("/", (req ,res) => {
    res.send("Método POST na '/'");
});

router.get('/sobre', (req, res) => {
    res.send('Página sobre');
});

router.get('/loren/:num', (req, res) => {
    const num = parseInt(req.params.num);
    let paragrafos = "";
    if (num && num >=1){
        paragrafos = loremIpsum({count: num, units: 'paragraph', suffix:'<br><br>'});
        paragrafos = `<p>${paragrafos}</p>`;
    }
    res.send(paragrafos);
})

router.get('/hb1', (req, res) =>{
    res.render('hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
        layout: false,
    });
});
router.get('/hb2', (req, res) =>{
    res.render('hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
});
router.get('/hb3',  (req, res) =>{
    const profs = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
        ];
    res.render('hb3', { profs, layout: false });
});

export default router;
