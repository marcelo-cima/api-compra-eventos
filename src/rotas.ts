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

rotas.use(youShallNotPass)

rotas.post('/compras', comprar)

rotas.get('/compras', listarCompras)

rotas.delete('/compras/:id', deletarCompras)

export default rotas;
