import { Request, Response } from "express";
import { EventoService } from "../Services/EventoService";
import { AnimalService } from "../Services/AnimalService";
import Animal from "../Models/animal"

export class EventoController {
  private eventoService: EventoService;
  private animalService: AnimalService;
  static getEvento: any;
  // Constutor da classe, onde é criada a instancia do eventoService
  constructor() {
    this.eventoService = new EventoService();
    this.animalService = new AnimalService();
  }

  
  // Método para criar um novo evento
  async createEvento(req: Request, res: Response) {
    const { animalId } = req.params;
    const bodyData = req.body;
    try {
      const animal = await this.animalService.getAnimalById(animalId);
      if (!animal) {
        return res.status(404).json({
          error: true,
          code: 404,
          message: `No animal with id ${animalId}`,
        });
      }

      // Create the new evento
      const newEvento = await this.eventoService.createEvento(bodyData);

      // Associate the new evento with the animal by adding its ID to the animal's evntos array
      animal.evento.push(newEvento._id);
      await animal.save();

      // Return the response with the newly created evento and animalId
      return res.status(201).json({ newEvento, animalId: animal._id, message: 'Evento created and associated with animal successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }
  
  // Método para atualizar um evento existente
  async updateEvento(req: Request, res: Response) {
    const { eventoId } = req.params;
    const updatedData = req.body;

    try {
        const updatedEvento = await this.eventoService.updateEvento(eventoId, updatedData);

        if (!updatedEvento) {
            return res.status(404).json({ message: 'Evento not found' });
        }

        return res.status(200).json({ updatedData, message: 'Evento updated successfully' });
    } catch (error) {
        return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para obter todos os eventos cadastrados, com os animais associados
  async getEvento(req: Request, res: Response) {
    try {
        // Chama o método getEvento do EventoService para obter a lista de evento
        const eventos = await this.eventoService.getEvento();

        // Retorna a resposta com a lista de evento e um status de sucesso
        return res.status(200).json({ eventos, message: 'Listing All eventos' });
    } catch (error) {
        // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
        return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

    // Método para obter um evento específico pelo ID
    async getEventoById(req: Request, res: Response) {
      const { eventoId } = req.params;

      try {
          const evento = await this.eventoService.getEventoById(eventoId);

          
          if (!evento) {
              return res.status(404).json({ message: 'Evento not found' });
          }

          return res.status(200).json(evento);
      } catch (error) {
          return res.status(400).json({ error, message: 'Request error, check and try again' });
      }
  }

  // Método para deletar um evento pelo ID
  async deleteEvento(req: Request, res: Response) {
      const { eventoId, animalId } = req.params;

      try {
          const animal = await this.animalService.getAnimalById(animalId);
          //const animal = await Animal.findById(animalId);
        
          if (!animal) {
            return res.status(404).json({
              error: true,
              code: 404,
              message: `No animal with id ${animalId}`,
            });
          }
          
          const index = animal.evento.findIndex((evento: any) => evento.id === eventoId);
          
          const del = animal.evento.splice(index, 1);
         // findByIdAndUpdate pegando direto da model, não passa pelo service nem pelo repository
          const animalAtualizado = await Animal.findByIdAndUpdate(
            animalId,
            { $pull: { eventos: del[0] } },
            { new: true }
          );
          if (!animalAtualizado) {
            return res
              .status(404)
              .json({
                error: true,
                code: 404,
                message: `error updating animal with id ${animalId}`,
              });
          }

          const deletedEvento = await this.eventoService.deleteEvento(eventoId);

          if (!deletedEvento) {
              return res.status(404).json({ message: 'Evento not found' });
          }

          return res.status(204).json({ message: 'Evento deleted successfully' });
      } catch (error) {
          return res.status(400).json({ error, message: 'Request error, check and try again' });
      }
  }
}