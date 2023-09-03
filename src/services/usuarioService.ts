import Usuario from "../Models/usuario";
import { UsuarioRepository } from "../Repositories/UsuarioRepository";

/*----------------- *** Funcionalidades *** ----------------------*/
export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  // Construtor da classe, onde é criada a instância do UsuarioRepository
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async getUsuarios() {
    try {
      // Utilize o método find do modelo usuario para obter todos os usuarios cadastrados
      // e use o método populate para carregar os detalhes dos animais associados
      return await this.usuarioRepository.findAllUsuarios();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para criar um novo usuario
  async createUsuario(data: any) {
    try {
      // Chama o método createUsuario do UsuarioRepository para criar um novo usuario com os dados fornecidos
      return await this.usuarioRepository.createUsuario(data);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para atualizar um usuario existente
  async updateUsuario(usuarioId: string, updatedData: any) {
    try {
      // Chama o método updateUsuario do UsuarioRepository para atualizar o usuario com o ID fornecido
      return await this.usuarioRepository.updateUsuario(usuarioId, updatedData);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }


  
  // Método para obter um usuario específico pelo ID com o Populate

  async getUsuarioById(usuarioId: string) {
    try {
  // Use o método findById do modelo usuario para obter o usuario pelo ID fornecido
  //     // Adicione o método populate('animal') para carregar os detalhes dos animais associados
    return await Usuario.findById(usuarioId).populate('animal').exec();
       // return await usuario.find().populate('animal').exec();
   } catch (error) {
  // Em caso de erro, lança o erro para ser tratado posteriormente
       throw error;
     }
  }

  // Método para deletar um usuario pelo ID
  async deleteUsuario(usuarioId: string) {
    try {
      // Verifica se o usuario existe no banco de dados
      const usuario = await Usuario.findById(usuarioId);
      if (!usuario) {
        throw new Error('Usuario not found');
      }

      // Verifica se o usuario possui animais associados
      if (usuario.animal.length > 0) {
        throw new Error('Usuario has animals associated and cannot be deleted');
      }

      // Caso o usuario não tenha animais associados, pode prosseguir com a exclusão
      return await Usuario.findByIdAndDelete(usuarioId);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }
  
}