import Producao from "../Models/producao";

export class ProducaoRepository {
  
  // Método para criar uma nova producao no banco de dados
  async createProducao(data: any) {
    try {
      return await Producao.create(data);
    } catch (error) {
      throw error;
    }
  }

  // Método para atualizar uma producao existente no banco de dados
  async updateProducao(producaoId: string, updatedData: any) {
    try {
      return await Producao.findByIdAndUpdate(producaoId, updatedData);
    } catch (error) {
      throw error;
    }
  }

  // Método para obter todas as producoes cadastradas no banco de dados
  async findAllProducao() {
    try {
      // Chama o método find do modelo producao para obter todas as producoes cadastradas
      return await Producao.find();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }
  
  // Método para obter uma producao específica pelo ID no banco de dados
  async findProducaoById(producaoId: string) {
    try {
        return await Producao.findById(producaoId);
    } catch (error) {
        throw error;
    }
  }

  // Método para deletar uma producao pelo ID no banco de dados
  async deleteProducao(producaoId: string) {
    try {
        return await Producao.findByIdAndDelete(producaoId);
    } catch (error) {
        throw error;
    }
  }
}