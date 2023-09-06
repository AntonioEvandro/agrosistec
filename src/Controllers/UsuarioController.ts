// Importações necessárias do Express e do Service relacionado ao usuario
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsuarioService } from '../Services/usuarioService'
import Usuario from "../Models/usuario";

// Controller do usuario, responsável por lidar com as requisições relacionadas aos usuarios
export class UsuarioController {
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

  // Método para atualizar um usuario existente
  async updateUsuario(req: Request, res: Response) {
    const { usuarioId } = req.params; // Obtém o ID do usuario a ser atualizado dos parâmetros da URL
    const updatedData = req.body; // Obtém os dados atualizados do corpo da requisição

    try {
      // Chama o método updateUsuario do UsuarioService para atualizar o usuario com o ID fornecido
      const updatedUsuario = await this.usuarioService.updateUsuario(usuarioId, updatedData);

      if (!updatedUsuario) {
        // Caso o usuario não seja encontrado, retorna uma resposta com uma mensagem de erro
        return res.status(404).json({ message: 'Usuario not found' });
      }

      // Retorna a resposta com o usuario atualizado e uma mensagem de sucesso
      return res.status(200).json({ updatedData, message: 'Usuario updated successfully' });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para obter todos os usuarios cadastrados
  async getUsuarios(req: Request, res: Response) {
    try {
      // Chama o método do serviço para obter todos os usuarios com seus animais associados
      const usuariosWithAnimals = await this.usuarioService.getUsuarios();

      // Retorna a resposta com a lista de usuarios e seus animais associados
      return res.status(200).json({ usuariosWithAnimals, message: 'Listing All Usuarios and animals' });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(500).json({ error, message: 'Internal server error' });
    }
  }

  // Método para obter um usuario específico pelo ID (não é um endpoint HTTP)
  async getUsuarioById(req: Request, res: Response) {
    const { usuarioId } = req.params; // Obtém o ID do usuario a ser buscado dos parâmetros da URL

    try {
      // Chama o método getUsuarioById do UsuarioService para obter o usuario pelo ID fornecido
      const usuario = await this.usuarioService.getUsuarioById(usuarioId);

      if (!usuario) {
        // Caso o usuario não seja encontrado, retorna uma resposta com uma mensagem de erro
        return res.status(404).json({ message: 'Usuario not found' });
      }

      // Retorna a resposta com o usuario encontrado e um status de sucesso
      return res.status(200).json(usuario);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para deletar um usuario pelo ID
  async deleteUsuario(req: Request, res: Response) {
    const { usuarioId } = req.params;

    try {
      const deletedUsuario = await this.usuarioService.deleteUsuario(usuarioId);

      if (!deletedUsuario) {
        return res.status(404).json({ message: 'Usuario not found' });
      }

      return res.status(204).json({ message: 'Usuario deleted successfully' });
    } catch (error: any) {
      if (error.message === 'Usuario has animals associated') {
        return res.status(403).json({ message: 'Usuario has animals associated and cannot be deleted' });
      }

      return res.status(400).json({ message: 'Request error, check and try again, usuario has animals associated and cannot be deleted' });
    }
  }

}