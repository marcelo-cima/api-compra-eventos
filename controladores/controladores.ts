import 'dotenv/config';
import { Express, Request, Response } from "express";
import TEvento from '../src/tipos/Evento';
import bancoDeDados from '../src/bancoDeDados';

//Homepage
export const inicio = (req: Request, res: Response) => {
    return res.status(200).json({
        mensagem: "API de vendas de ingressos"
    })
}

//Filtrar por preço maximo
export const eventos = (req: Request, res: Response) => {
    const { maxPreco } = req.query

    const produto = bancoDeDados.eventos.filter((item) => {
        return item.preco <= Number(maxPreco)
    })

    return res.status(200).json(produto)  
}