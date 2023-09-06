import { Request, Response } from "express";
import { AnimalService } from "../Services/AnimalService";
import { UsuarioService } from "../Services/usuarioService";

export class AnimalController {
  private animalService: AnimalService;
  private usuarioService: UsuarioService;
  static getAnimal: any; // Teste
  // Constutor da classe, onde é criada a instancia do animalService
  constructor() {
    this.animalService = new AnimalService();
    this.usuarioService = new UsuarioService();
  }

  // Método para criar um novo animal
  async createAnima(req: Request, res: Response) {}
}