import { Router, Request, Response } from 'express';
import { UsuarioController } from '../Controllers/UsuarioController';
import { AnimalController } from '../Controllers/AnimalController';
import AuthController from './../Controllers/Auth';
import Auth from '../Middleware/Auth';

const usuarioController = new UsuarioController();
const router: Router = Router();
const animalController = new AnimalController();

/*---------------------Gets e Posts----------------*/

export default router
.get("/home", (req: Request, res: Response) => {
    res.status(200).send("API Working!");
})
// Rota de autenticação
.post("/login", Auth.Login)
// Rotas para usuario
.post("/usuario", usuarioController.createUsuario.bind(usuarioController))
.get("/usuarios", usuarioController.getUsuarios.bind(usuarioController))
.get("/usuario/:id", Auth, usuarioController.getUsuarioById.bind(usuarioController))
.put("/usuario/:id", Auth, usuarioController.updateUsuario.bind(usuarioController))
.delete("/usuario/:id", Auth, usuarioController.deleteUsuario.bind(usuarioController))
// Rotas ora animal
.post("/animal/:usuarioId", Auth, AnimalController.createAnimal.bind(animalController))
.get("/animal", Auth, AnimalController.getAnimal.bind(AnimalController))
.get("/animal/:usuarioId", Auth, AnimalController.getAnimalId.bind(AnimalController))
.put("/animal/:animalId/usuario/:usuarioId", Auth, AnimalController.updateAnimal.bind(AnimalController))
.delete("/animal/:animalId/usuario/:usuarioId", Auth, AnimalController.deleteAnimal.bind(AnimalController))
