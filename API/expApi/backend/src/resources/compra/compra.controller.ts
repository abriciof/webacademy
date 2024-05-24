import e, { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ItemCarrinhoDto } from "./compra.type";
import {createCompra, createItemCarrinho} from "../compra/compra.service"
import { ItemListaCompra } from "@prisma/client";

const addItemCarrinho = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Adiciona item ao carrinho.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { 
            $ref: '#/definitions/ItemCarrinho'
        }
    }
    #swagger.responses[200] = {
        schema: { msg: 'Item adicionado ao carrinho!' }
    }
     #swagger.responses[409] = {
        schema: { msg: 'Sessão expirada, faça login novamente' }
    }   
    */
    const itemCarrinho = req.body as ItemCarrinhoDto;
    try {
        if (req.session.uid){
            req.session.carrinho?.push(itemCarrinho);
            res.status(StatusCodes.CREATED).json('Item adicionado ao carrinho!')
        }else{
            res.status(StatusCodes.CONFLICT).json('Sessão expirada, faça login novamente');
        }
    } catch (err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

const efetuarCarrinho = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Efetua compra do carrinho.'
    #swagger.responses[200] = {
        schema: { msg: 'Compra efeituada com sucesso!' }
    }
   
    */
    try {

        if (req.session.uid && req.session.carrinho){
            const usuarioId = req.session.uid;
            const compra = await createCompra({usuarioId});
            const carrinho = req.session.carrinho;
            const adicionados: ItemListaCompra[] = []
            carrinho.map(async (itemCarrinho) => {
                let itemCompra = {
                    listaCompraId: compra.id as string,
                    produtoId: itemCarrinho.produtoId as string,
                    quantidade: itemCarrinho.quantidade as number
                }
                adicionados.push(await createItemCarrinho(itemCompra));
            });
            res.status(StatusCodes.CREATED).json({msg: "Compra efeituada com sucesso!", itens: adicionados})
           
        }else{
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
        }
    } catch (err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

export default { addItemCarrinho, efetuarCarrinho }