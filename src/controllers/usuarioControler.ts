// Importações necessárias do Express e do Service relacionado ao usuario
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsuarioService } from '../services/usuarioService'
import Usuario from "../Models/usuario";

// Controller do usuario, responsável por lidar com as requisições relacionadas aos usuarios
export class usuarioController {
  private usuarioService: UsuarioService;
    static getUsers: any; // Teste
  
  // Contrutor da classe, onde é criada a instância do UsuarioService
  constructor() {
    this.usuarioService = new UsuarioService();

  // Abaixo os metódos \\ 
  }
  
  async authenticateUsuario(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      // Busca o usuario pelo email no banco de dados
      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        // Caso o usuario não seja encontrado, retorna uma resposta com uma mensagem de erro
        return res.status(404).json({ message: 'Usuario not found' });
      }

      // Verifica se a senha fornecida corresponde à senha criptografada no banco de dados
      const isSenhaValid = await bcrypt.compare(senha, usuario.senha);

      if (!isSenhaValid) {
        // Caso a senha seja inválida, retorna uma resposta com uma mensagem de erro
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Se a autenticação for bem-sucedida, você pode gerar um token de acesso
      const accessToken = jwt.sign({ _id: usuario._id }, 'suaChaveSecreta', {
        expiresIn: '1h', // Defina o tempo de expiração do token, por exemplo, 1 hora
      });

      // Retorna o token de acesso na resposta
      return res.status(200).json({ access_token: accessToken });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(500).json({ error, message: 'Internal server error' });
    }
  }

  // Método para criar um novo usuario
  async createUsuario(req: Request, res: Response) {
    const bodyData = req.body;
    try {
      // Chama o método createUsuario do UsuarioService para criar um novo usuario
      const newUsuario = await this.usuarioService.createUsuario(bodyData);
      // Retorna a resposta com o novo usuario criado e uma mensagem de sucesso
      return res.status(201).json({ newUsuario, message: 'Usuario created successfully' });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }


}