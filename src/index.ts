import express from 'express'
import app from "./app";
import bancoDeDados from './bancoDeDados';

const PORTA = process.env.PORTA;

// app.get('/', (req, res) => {
//     return res.status(200).json('API de vendas de ingressos')
// })

// app.get('/eventos', (req, res) => {

//     const { maxPreco } = req.query

//     if(!maxPreco){
//         return res.status(200).json(bancoDeDados.eventos)
//     }

//     if (isNaN(Number(maxPreco)) || Number(maxPreco) < 0) {
//         return res.status(400).json('O preço máximo do evento deve conter apenas números e deve ser positivo')
//     }

//     const produto = bancoDeDados.eventos.filter((item) => {
//         return item.preco <= Number(maxPreco)
//     })

//     return res.status(200).json(produto)  
// })

app.listen(PORTA, () => console.log(`API rodando na porta ${PORTA}`));