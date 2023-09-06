import { Router, Request, Response } from 'express';
import { UsuarioController } from '../Controllers/UsuarioController';
import { AnimalController } from '../Controllers/AnimalController';
import AuthController from './../Controllers/Auth';
import AuthMiddleware from '../Middleware/AuthMiddleware';

const usuarioController = new UsuarioController();
const router: Router = Router();
const animalController = new AnimalController();

/*---------------------Gets e Posts----------------*/

export default router
.get("/home", (req: Request, res: Response) => {
    res.status(200).send("API Working!");
})
// Rota de autenticação
.post("/login", AuthController.Login)
// Rotas para usuario
.post("/usuario", usuarioController.createUsuario.bind(usuarioController))
.get("/usuarios", usuarioController.getUsuarios.bind(usuarioController))
.get("/usuario/:id", AuthMiddleware, usuarioController.getUsuarioById.bind(usuarioController))
.put("/usuario/:id", AuthMiddleware, usuarioController.updateUsuario.bind(usuarioController))
.delete("/usuario/:id", AuthMiddleware, usuarioController.deleteUsuario.bind(usuarioController))
// Rotas para animal
.post("/animal/:usuarioId", AuthMiddleware, AnimalController.createAnimal.bind(animalController))
.get("/animal", AuthMiddleware, AnimalController.getAnimal.bind(AnimalController))
.get("/animal/:usuarioId", AuthMiddleware, AnimalController.getAnimalById.bind(AnimalController))
.put("/animal/:animalId/usuario/:usuarioId", AuthMiddleware, AnimalController.updateAnimal.bind(AnimalController))
.delete("/animal/:animalId/usuario/:usuarioId", AuthMiddleware, AnimalController.deleteAnimal.bind(AnimalController))
