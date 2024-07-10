import { Request, Response } from "express";
import {v4 as uuidv4 } from 'uuid';
import bancoDeDados from "../src/bancoDeDados";
import TUsuario from "../src/tipos/Usuario";
import { criptografarSenha } from "../auxiliares/criptografia";

// Mensagens de erro
const faltaCampo = { mensagem: "Todos os campos são obrigatórios" }


// Cadastro
export const cadastrar = (req: Request, res: Response) => {
    const { nome, email, senha } = req.body
    
    // Campo nao preenchido
    if(!nome || !email || !senha) {
        return res.status(401).json(faltaCampo)
    }

    // Email informado ja existe
    if(bancoDeDados.usuarios.find((item) => item.email === email)){
        return res.status(401).json({
            mensagem: "E-mail já cadastrado"
    })
    }

    // Envia o usuario
    const senhaCript = criptografarSenha(senha)
    const novoUsuario: TUsuario = {
        id: uuidv4(),
        nome,
        email,
        senha: senhaCript
    }
    bancoDeDados.usuarios.push(novoUsuario)

    // Retorna infos de cadastro
    const { senha: _, ...loginCompleto } = novoUsuario
    return res.status(201).json(loginCompleto)
}


// Login

export const login = (req: Request, res: Response) => {
    const { email, senha } = req.body

    // Campo nao preenchido
    if(!email || !senha) {
        return res.status(401).json(faltaCampo)
    }
    
    // Busca de Usuario
    const usuarioLogado = bancoDeDados.usuarios.find((usuario) => usuario.email === email)
    
    // Email invalido
    if(!usuarioLogado){
        return res.status(400).json({mensagem: "E-mail ou senha inválidos"})
    }

    // const emailBancoDeDados = usuarioLogado?.email
    const senhaBancoDeDados = usuarioLogado?.senha

    // Senha invalida
    if(senhaBancoDeDados != criptografarSenha(senha)){
        return res.status(400).json({mensagem: "E-mail ou senha inválidos"})
    }
  

    console.log()
    return res.send('ok')


    // if (!emailUsuario || !senhaUsuario) {
    //     return res.status(400).json({
    //         mensagem: "E-mail ou senha inválidos"
    //     })
    // }

    // const idUsuario = bancoDeDados.usuarios.find((item) => {
    //     if (item.email === email){
    //         return item.id
    //     }
    // }) 

    // if(!email || !senha) {
    //     return res.status(400).json(faltaCampo)
    // }

    // if(emailUsuario && senhaUsuario) {
    //     return res.json({
    //         comprovante: `${senha}/${idUsuario}`
    //     })
    // }

    // return res.status(400).json({
    //     mensagem: "E-mail ou senha inválidos"
    // })
}