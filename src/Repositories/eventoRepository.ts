import Evento from "../Models/evento"

export class EventoRepository {
  // Método para criar um novo evento no banco de dados
  async createEvento(data: any) {
    try {
      return await Evento.create(data);
    } catch (error) {
      throw error;
    }
  }

  // Método para atualizar um evento existente no banco de dados
  async updateEvento(eventoId: string, updatedData: any) {
    try {
      return await Evento.findByIdAndUpdate(eventoId, updatedData);
    } catch (error) {
      throw error;
    }
  }
  
  // Método para obter todos os eventos cadastrados no banco de dados
  async findAllEvento() {
    try {
      // Chama o método find do modelo evento para obter todos os eventos cadastrados
      return await Evento.find();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter um evento específico pelo ID no banco de dados
  async findEventoById(eventoId: string) {
      try {
          return await Evento.findById(eventoId);
      } catch (error) {
          throw error;
      }
  }

  // Método para deletar um evento pelo ID no banco de dados
  async deleteEvento(eventoId: string) {
      try {
          return await Evento.findByIdAndDelete(eventoId);
      } catch (error) {
          throw error;
      }
  }
}