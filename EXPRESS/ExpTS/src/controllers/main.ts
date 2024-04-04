import { Request, Response } from 'express';
import { loremIpsum } from 'lorem-ipsum';


const index = (req: Request, res: Response) => {
    res.render("main/index",{
        mensagem: 'Welcome to Web academy!'
    })
};

const loren = (req: Request, res: Response) => {
    const num = parseInt(req.params.num);
    let paragrafos = "";
    if (num && num >=1){
        paragrafos = loremIpsum({count: num, units: 'paragraph', suffix:'<br><br>'});
    }
    res.render('main/loren', {
        loren: paragrafos
    })
};

const hb1 = (req: Request, res: Response) => {
    res.render('main/hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!'
    });
};

const hb2 = (req: Request, res: Response) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework'
    });
};

const hb3 = (req: Request, res: Response) => {
    const profs = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profs });
}

const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
       ];
    res.render('main/hb4', { technologies });
}

export default { index, loren, hb1, hb2, hb3, hb4 };