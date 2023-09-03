// Importações necessárias do Express e do Service relacionado ao usuario
import { Request, Response } from "express";
import { UsuarioService } from '../services/usuarioService'

// Controller do usuario, responsável por lidar com as requisições relacionadas aos usuarios
export class usuarioController {
  private usuarioService: UsuarioService;
    static getUsers: any; // Teste
  
  // Contrutor da classe, onde é criada a instância do UsuarioService
  constructor() {
    this.usuarioService = new UsuarioService();

  // Abaixo os metódos \\ 
  }
}