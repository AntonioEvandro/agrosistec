import Alimentacao from "../Models/alimentacao";

export class AlimentacaoRepository {
  // Método para criar uma nova alimentacao no banco de dados
  async createAlimentacao(data: any) {
    try {
      return await Alimentacao.create(data);
    } catch (error) {
      throw error;
    }
  }

  // Método para atualizar uma alimentacao existente no banco de dados
  async updateAlimentacao(alimentacaoId: string, updatedData: any) {
    try {
      return await Alimentacao.findByIdAndUpdate(alimentacaoId, updatedData);
    } catch (error) {
      throw error;
    }
  }
  
  // Método para obter todas as alimentacoes cadastradas no banco de dados
  async findAllAlimentacao() {
    try {
      // Chama o método find do modelo alimentacao para obter todas as alimentacoes cadastradas
      return await Alimentacao.find();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter uma alimentacao específica pelo ID no banco de dados
  async findAlimentacaoById(alimentacaoId: string) {
      try {
          return await Alimentacao.findById(alimentacaoId);
      } catch (error) {
          throw error;
      }
  }

  // Método para deletar uma alimentacao pelo ID no banco de dados
  async deleteAlimentacao(alimentacaoId: string) {
      try {
          return await Alimentacao.findByIdAndDelete(alimentacaoId);
      } catch (error) {
          throw error;
      }
  }}