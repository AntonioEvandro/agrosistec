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
}