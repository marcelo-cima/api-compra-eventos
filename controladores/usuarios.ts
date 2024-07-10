import { Request, Response } from "express";
import bancoDeDados from "../src/bancoDeDados";
import TUsuario from "../src/tipos/Usuario";

// ID Automatico
let proxIdentificador = 2

// Mensagens de erro
const faltaCampo = { mensagem: "Todos os campos são obrigatórios" }


// Cadastro
export const cadastrar = (req: Request, res: Response) => {
    const { id, nome, email, senha } = req.body

    const novoUsuario: TUsuario = {
        id,
        nome,
        email,
        senha
    }

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

    bancoDeDados.usuarios.push(novoUsuario)

    return res.status(201).json({
        id,
        nome,
        email
    })
}


// Login

export const login = (req: Request, res: Response) => {
    const { id, email, senha } = req.body

    const emailUsuario = bancoDeDados.usuarios.find((item) => item.email === email)
    const senhaUsuario = bancoDeDados.usuarios.find((item) => item.senha === email)

    if(!email || !senha) {
        return res.status(400).json(faltaCampo)
    }

    if(emailUsuario && senhaUsuario) {
        return res.json({
            comprovante: `${senha}/${id}`
        })
    }

    return res.status(400).json({
        mensagem: "E-mail ou senha inválidos"
    })
}