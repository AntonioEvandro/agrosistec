import { Request, Response } from "express";
import { AlimentacaoService } from "../Services/AlimentacaoService";
import { AnimalService } from "../Services/AnimalService";
import Animal from "../Models/animal"

export class AlimentacaoController {
  private alimentacaoService: AlimentacaoService;
  private animalService: AnimalService;
  static getAlimentacao: any;
  // Constutor da classe, onde é criada a instancia do alimentacaoService
  constructor() {
    this.alimentacaoService = new AlimentacaoService();
    this.animalService = new AnimalService();
  }
  
  // Método para criar uma nova alimentacao
  async createAlimentacao(req: Request, res: Response) {
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

      // Create the new alimentacao
      const newAlimentacao = await this.alimentacaoService.createAlimentacao(bodyData);

      // Associate the new alimentacao with the animal by adding its ID to the animal's evntos array
      animal.alimentacao.push(newAlimentacao._id);
      await animal.save();

      // Return the response with the newly created alimentacao and animalId
      return res.status(201).json({ newAlimentacao, animalId: animal._id, message: 'Alimentacao created and associated with animal successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }
  
  // Método para atualizar uma alimentacao existente
  async updateAlimentacao(req: Request, res: Response) {
    const { alimentacaoId } = req.params;
    const updatedData = req.body;

    try {
        const updatedAlimentacao = await this.alimentacaoService.updateAlimentacao(alimentacaoId, updatedData);

        if (!updatedAlimentacao) {
            return res.status(404).json({ message: 'Alimentacao not found' });
        }

        return res.status(200).json({ updatedData, message: 'Alimentacao updated successfully' });
    } catch (error) {
        return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para obter todas as alimentacoes cadastradas, com os animais associados
  async getAlimentacao(req: Request, res: Response) {
    try {
        // Chama o método getAlimentacao do AlimentacaoService para obter a lista de alimentacao
        const alimentacoes = await this.alimentacaoService.getAlimentacao();

        // Retorna a resposta com a lista de alimentacao e um status de sucesso
        return res.status(200).json({ alimentacoes, message: 'Listing All alimentacoes' });
    } catch (error) {
        // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
        return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

    // Método para obter uma alimentacao específica pelo ID
    async getAlimentacaoById(req: Request, res: Response) {
      const { alimentacaoId } = req.params;

      try {
          const alimentacao = await this.alimentacaoService.getAlimentacaoById(alimentacaoId);

          
          if (!alimentacao) {
              return res.status(404).json({ message: 'Alimentacao not found' });
          }

          return res.status(200).json(alimentacao);
      } catch (error) {
          return res.status(400).json({ error, message: 'Request error, check and try again' });
      }
  }

  // Método para deletar uma alimentacao pelo ID
  async deleteAlimentacao(req: Request, res: Response) {
      const { alimentacaoId, animalId } = req.params;

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
          
          const index = animal.alimentacao.findIndex((alimentacao: any) => alimentacao.id === alimentacaoId);
          
          const del = animal.alimentacao.splice(index, 1);
         // findByIdAndUpdate pegando direto da model, não passa pelo service nem pelo repository
          const animalAtualizado = await Animal.findByIdAndUpdate(
            animalId,
            { $pull: { alimentacoes: del[0] } },
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

          const deletedAlimentacao = await this.alimentacaoService.deleteAlimentacao(alimentacaoId);

          if (!deletedAlimentacao) {
              return res.status(404).json({ message: 'Alimentacao not found' });
          }

          return res.status(204).json({ message: 'Alimentacao deleted successfully' });
      } catch (error) {
          return res.status(400).json({ error, message: 'Request error, check and try again' });
      }
  }
}