import { Router, Request, Response } from 'express';
import { UsuarioController } from '../Controllers/UsuarioController';
import { AnimalController } from '../Controllers/AnimalController';
import AuthController from './../Controllers/Auth';
import AuthMiddleware from '../Middleware/AuthMiddleware';
import { EventoController } from '../Controllers/EventoController';
import { AlimentacaoController } from '../Controllers/AlimentacaoController';

const usuarioController = new UsuarioController();
const router: Router = Router();
const animalController = new AnimalController();
const eventoController = new EventoController();
const alimentacaoController = new AlimentacaoController();

/*---------------------Gets e Posts----------------*/

router.get("/home", (req: Request, res: Response) => {
    res.status(200).send("API Working!");
})
// Rota de autenticação
.post("/login", AuthController.Login)
// Rotas para usuario
.post("/usuario", usuarioController.createUsuario.bind(usuarioController))
.get("/usuarios", usuarioController.getUsuarios.bind(usuarioController))
.get("/usuario/:usuarioId", AuthMiddleware, usuarioController.getUsuarioById.bind(usuarioController))
.put("/usuario/:usuarioId", AuthMiddleware, usuarioController.updateUsuario.bind(usuarioController))
.delete("/usuario/:usuarioId", AuthMiddleware, usuarioController.deleteUsuario.bind(usuarioController))
// Rotas para animal
.post("/animal/:usuarioId", AuthMiddleware, animalController.createAnimal.bind(animalController))
.get("/animal", AuthMiddleware, animalController.getAnimal.bind(animalController))
.get("/animal/:animalId", AuthMiddleware, animalController.getAnimalById.bind(animalController))
.put("/animal/:animalId/usuario/:usuarioId", AuthMiddleware, animalController.updateAnimal.bind(animalController))
.delete("/animal/:animalId/usuario/:usuarioId", AuthMiddleware, animalController.deleteAnimal.bind(animalController))
// Rotas para Evento
.post("/evento/:animalId", AuthMiddleware, eventoController.createEvento.bind(eventoController))
.get("/evento", AuthMiddleware, eventoController.getEvento.bind(eventoController))
.get("/evento/:animalId", AuthMiddleware, eventoController.getEventoById.bind(eventoController))
.put("/evento/:eventoId/animal/:animalId", AuthMiddleware, eventoController.updateEvento.bind(eventoController))
.delete("/evento/:eventoId/animal/:animalId", AuthMiddleware, eventoController.deleteEvento.bind(eventoController))
// Rotas para Alimentação
.post("/alimentacao/:animalId", AuthMiddleware, alimentacaoController.createAlimentacao.bind(alimentacaoController))
.get("/alimentacao", AuthMiddleware, alimentacaoController.getAlimentacao.bind(alimentacaoController))
.get("/alimentacao/:animalId", AuthMiddleware, alimentacaoController.getAlimentacaoById.bind(alimentacaoController))
.put("/alimentacao/:alimentacaoId/animal/:animalId", AuthMiddleware, alimentacaoController.updateAlimentacao.bind(alimentacaoController))
.delete("/alimentacao/:alimentacaoId/animal/:animalId", AuthMiddleware, alimentacaoController.deleteAlimentacao.bind(alimentacaoController))
/*
// Rotas para Produção
.post("/producao/:animalId", AuthMiddleware, producaoController.createProducao.bind(producaoController))
.get("/producao", AuthMiddleware, producaoController.getProducao.bind(producaoController))
.get("/producao/:animalId", AuthMiddleware, producaoController.getProducaoById.bind(producaoController))
.put("/producao/:producaoId/animal/:animalId", AuthMiddleware, producaoController.updateProducao.bind(producaoController))
.delete("/producao/:producaoId/animal/:animalId", AuthMiddleware, producaoController.deleteProducao.bind(producaoController))
*/
export { router };