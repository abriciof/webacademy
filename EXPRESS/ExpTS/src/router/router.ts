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

export default router;
