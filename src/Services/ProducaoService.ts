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
}