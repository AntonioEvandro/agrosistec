import { ProducaoRepository } from "../Repositories/ProducaoRepository";

export class ProduçãoService {
  private producaoRepository: ProducaoRepository;

  constructor() {
    this.producaoRepository = new ProducaoRepository();
  }

  // Metodo para criar uma nova producao
  async createProducao(data: any) {
    try {
      // Chama o método createProducao do ProducaoRepository para criar umanova producao com os dados fornecidos
      return await this.producaoRepository.createProducao(data);
    } catch (error) {
      throw error;
    }
  }

  // Método para atualizar uma producao existente
  async updateProducao(producaoId: string, updateData: any) {
    try {
      return await this.producaoRepository.updateProducao(producaoId, updateData);
    } catch (error) {
      throw error;
    }
  }
  
  // Método para obter todos as producoes
  async getProducao() {
    try {
      // Chama o método findAllProducao do ProducaoRepository para obter todas as producoes cadastradas
      return await this.producaoRepository.findAllProducao();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter uma producao específica pelo ID
  async getProducaoById(producaoId: string) {
    try {
      return await this.producaoRepository.findProducaoById(producaoId);
    } catch (error) {
      throw error;
    }
  }
  
  // Método para deletar uma producao pelo ID
  async deleteProducao(producaoId: string) {
    try {
      return await this.producaoRepository.deleteProducao(producaoId);
    } catch (error) {
      throw error;
    }
  }
}