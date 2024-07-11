import { Request, Response } from "express";
import {v4 as uuidv4 } from 'uuid';
import bancoDeDados from "../src/bancoDeDados";
import TCompra from "../src/tipos/Compra";
import { decriptComprovante } from "../intermediarios/intermediarios";
import { eventos } from "./controladores";

type TCompraFeita = {
    idCompra: string,
    idEvento: string,
    nome: string,
    endereco: string,
    data: string,
    preco: number
}


// Comprar

export const comprar = (req: Request, res: Response) => {
    const { id: idEvento } = req.body
    const { comprovante } = req.query

    // Falta id
    if (!idEvento){
        return res.status(400).json({mensagem: "O identificador do evento é obrigatório"})
    }

    // Procura evento
    const encontrarIdEvento = bancoDeDados.eventos.find((evento) => evento.id === idEvento)

    // Nao acha evento
    if (!encontrarIdEvento) {
        return res.status(404).json({mensagem: "Evento não encontrado"})
    }
    
    // Salva compra
    const idUsuario = decriptComprovante(String(comprovante))
    const idCompra = uuidv4()
    const novaCompra: TCompra = {
        id: idCompra,
        id_usuario: idUsuario,
        id_evento: idEvento
    }
    bancoDeDados.compras.push(novaCompra)


    // Emite recibo da compra
    return res.json({novaCompra})

}


// Listar compras

export const listarCompras = (req: Request, res: Response) => {
    const { comprovante } = req.query
    const { compras, eventos } = bancoDeDados
    const idUsuario = decriptComprovante(String(comprovante))

    // Filtrar compras do usuario
    const comprasUsuario: TCompra[] = compras.filter((compra) => compra.id_usuario === idUsuario)
    
    // Adicionar infos ao recibo
    const listaComprasUsuario = comprasUsuario.map(recibo => {
        const eventoUsuario = eventos.find(evento => evento.id === recibo.id_evento) 
        return {
            idCompra: recibo.id,
            idEvento: recibo.id_evento,
            nome: eventoUsuario?.nome,
            endereco: eventoUsuario?.endereco,
            data: eventoUsuario?.data,
            preco: eventoUsuario?.preco
            }
        })

    return res.send(listaComprasUsuario)
}


// Deletar compras

export const deletarCompras = (req: Request, res: Response) => {
    const { id: idCompra } = req.params
    const { comprovante } = req.query
    const idUsuario = decriptComprovante(String(comprovante))

    // Filtrar compras do usuario
    const comprasUsuario: TCompra[] = bancoDeDados.compras.filter(compra => compra.id_usuario === idUsuario)
    
    // Encontra compra
    const encontrarCompra = comprasUsuario.find(compra => compra.id === idCompra)
    const indexCompra = comprasUsuario.findIndex(compra => compra.id === idCompra)

    // Se nao encontra compra
    if(!encontrarCompra) {
        return res.status(404).json({
            mensagem: "Evento não encontrado"
        })
    }

    // Deleta compra
    comprasUsuario.splice(indexCompra, 1)

    return res.status(204).send()
}