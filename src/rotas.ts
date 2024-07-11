import { Router } from "express";
import { inicio, eventos } from "../controladores/controladores";
import { filtroChecarEventos, youShallNotPass } from "../intermediarios/intermediarios";
import { cadastrar, login } from "../controladores/usuarios";
import { comprar, deletarCompras, listarCompras } from "../controladores/comprarEvento";


const rotas = Router();

rotas.get('/', inicio)

rotas.get('/eventos', filtroChecarEventos, eventos)

rotas.post('/usuarios', cadastrar)

rotas.post('/login', login)

rotas.post('/compras', youShallNotPass, comprar)

rotas.get('/compras', youShallNotPass, listarCompras)

rotas.delete('/compras/:id', youShallNotPass, deletarCompras)

export default rotas;
