import Usuario from "../Models/usuario";

export class UsuarioRepository {
  // Método para criar um novo Usuario no banco de dados
  async createUsuario(data: any) {
    try {
      // Chama o método create do modelo usuario passando os dados recebidos
      return await Usuario.create(data);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para atualizar um usuario existente no banco de dados
  async updateUsuario(usuarioId: string, updatedData: any) {
    try {
      // Chama o método findByIdAndUpdate do modelo usuario para atualizar o usuario com o ID fornecido
      return await Usuario.findByIdAndUpdate(usuarioId, updatedData);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter todos os usuarios cadastrados no banco de dados
  async findAllUsuarios() {
    try {
      // Chama o método find do modelo usuario para obter todos os usuarios cadastrados
      return await Usuario.find().select('-password').populate({path: 'animal', populate: [{path: 'evento'},{path: 'alimentacao'},{path: 'producao'}]}).exec();;
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter um usuario específico pelo ID no banco de dados
  async findUsuarioById(usuarioId: string) {
    try {
      // Chama o método usuariofindById do modelo usuario para obter o usuario pelo ID fornecido
      return await Usuario.findById(usuarioId);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para deletar um usuario pelo ID no banco de dados
  async deleteUsuario(usuarioId: string) {
    try {
      // Chama o método findByIdAndDelete do modelo usuario para deletar o usuario com o ID fornecido
      return await Usuario.findByIdAndDelete(usuarioId);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }
}