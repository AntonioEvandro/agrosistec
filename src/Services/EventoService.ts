import { EventoRepository } from "../Repositories/EventoRepository";

export class EventoService {
  private eventoRepository: EventoRepository;

  constructor() {
    this.eventoRepository = new EventoRepository();
  }
  
  // Metodo para criar um novo evento
  async createEvento(data: any) {
    try {
      // Chama o método createEvento do EventoRepository para criar um novo evento com os dados fornecidos
      return await this.eventoRepository.createEvento(data);
    } catch (error) {
      throw error;
    }
  }
  
  // Método para atualizar um evento existente
  async updateEvento(eventoId: string, updatedData: any) {
    try {
      return await this.eventoRepository.updateEvento(eventoId, updatedData);
    } catch (error) {
      throw error;
    }
  }

  // Método para obter todos os animais
  async getEvento() {
    try {
      // Chama o método findAllAnimais do EventoRepository para obter todos os animais cadastrados
      return await this.eventoRepository.findAllEvento();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter um evento específico pelo ID
  async getEventoById(eventoId: string) {
    try {
      return await this.eventoRepository.findEventoById(eventoId);
    } catch (error) {
      throw error;
    }
  }

  // Método para deletar um evento pelo ID
  async deleteEvento(eventoId: string) {
    try {
      return await this.eventoRepository.deleteEvento(eventoId);
    } catch (error) {
      throw error;
    }
  }
}