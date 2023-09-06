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
  
}