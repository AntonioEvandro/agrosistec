import { AlimentacaoRepository } from "../Repositories/AlimentacaoRepository";

export class AlimentacaoService {
  private alimentacaoRepository: AlimentacaoRepository;

  constructor() {
    this.alimentacaoRepository = new AlimentacaoRepository();
  }
  
  // Metodo para criar uma nova alimentacao
  async createAlimentacao(data: any) {
    try {
      // Chama o método createAlimentacao do AlimentacaoRepository para criar uma nova alimentacao com os dados fornecidos
      return await this.alimentacaoRepository.createAlimentacao(data);
    } catch (error) {
      throw error;
    }
  }
  
  // Método para atualizar uma alimentacao existente
  async updateAlimentacao(alimentacaoId: string, updatedData: any) {
    try {
      return await this.alimentacaoRepository.updateAlimentacao(alimentacaoId, updatedData);
    } catch (error) {
      throw error;
    }
  }

  // Método para obter todos as alimentacoes
  async getAlimentacao() {
    try {
      // Chama o método findAllAlimentacao do AlimentacaoRepository para obter todas as alimentacoes cadastradas
      return await this.alimentacaoRepository.findAllAlimentacao();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter uma alimentacao específica pelo ID
  async getAlimentacaoById(alimentacaoId: string) {
    try {
      return await this.alimentacaoRepository.findAlimentacaoById(alimentacaoId);
    } catch (error) {
      throw error;
    }
  }

  // Método para deletar uma alimentacao pelo ID
  async deleteAlimentacao(alimentacaoId: string) {
    try {
      return await this.alimentacaoRepository.deleteAlimentacao(alimentacaoId);
    } catch (error) {
      throw error;
    }
  }
}