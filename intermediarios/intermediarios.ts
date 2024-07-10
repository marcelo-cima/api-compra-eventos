import 'dotenv/config';
import { Express, NextFunction, Request, Response} from "express";
import TEvento from '../src/tipos/Evento';
import bancoDeDados from '../src/bancoDeDados';
import fraseSecreta from '../src/fraseSecreta';

// Filtrar por preço maximo
export const filtroChecarEventos = (req: Request, res: Response, next: NextFunction) => {
    const { maxPreco } = req.query

    if(!maxPreco){
        return res.status(200).json(bancoDeDados.eventos)
    }

    if (isNaN(Number(maxPreco)) || Number(maxPreco) < 0) {
        return res.status(400).json({
        mensagem: "O preço máximo do evento deve conter apenas números e deve ser positivo"
    })
    }
    next()
}

// Nao entra sem login
export const youShallNotPass = (req: Request, res: Response, next: NextFunction) => {
    const { comprovante } = req.query

    const idUsuario = String(comprovante).split("/").join()
    
    console.log(idUsuario)

    const encontrarComprovante = bancoDeDados.usuarios.find((usuario) => usuario.id === idUsuario)

    if(!comprovante || !encontrarComprovante) {
    return res.status(401).send('Falha na autenticação')
    }

    next()
}