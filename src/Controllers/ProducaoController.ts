import { Request, Response } from "express";
import { ProducaoService } from "../Services/ProducaoService";
import { AnimalService } from "../Services/AnimalService";
import Animal from "../Models/animal";

export class ProducaoController {
  private producaoService: ProducaoService;
  private animalService: AnimalService;
  static getAnimal: any;
  // Constutor da classe, onde é criada a instancia do producaoService
  constructor() {
    this.producaoService = new ProducaoService();
    this.animalService = new AnimalService();
  }
  
  // Método para criar uma nova producao
  async createProducao(req: Request, res: Response) {
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

      // Create the new producao
      const newProducao = await this.producaoService.createProducao(bodyData);

      // Associate the new producao with the animal by adding its ID to the animal's evntos array
      animal.producao.push(newProducao._id);
      await animal.save();

      // Return the response with the newly created producao and animalId
      return res.status(201).json({ newProducao, animalId: animal._id, message: 'Producao created and associated with animal successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }
  
  // Método para atualizar uma producao existente
  async updateProducao(req: Request, res: Response) {
    const { producaoId } = req.params;
    const updatedData = req.body;

    try {
        const updatedProducao = await this.producaoService.updateProducao(producaoId, updatedData);

        if (!updatedProducao) {
            return res.status(404).json({ message: 'Producao not found' });
        }

        return res.status(200).json({ updatedData, message: 'Producao updated successfully' });
    } catch (error) {
        return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para obter todas as producoes cadastradas, com os animais associados
  async getProducao(req: Request, res: Response) {
    try {
        // Chama o método getProducao do ProducaoService para obter a lista de producao
        const producoes = await this.producaoService.getProducao();

        // Retorna a resposta com a lista de producao e um status de sucesso
        return res.status(200).json({ producoes, message: 'Listing All producoes' });
    } catch (error) {
        // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
        return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

    // Método para obter uma producao específica pelo ID
    async getProducaoById(req: Request, res: Response) {
      const { producaoId } = req.params;

      try {
          const producao = await this.producaoService.getProducaoById(producaoId);

          
          if (!producao) {
              return res.status(404).json({ message: 'Producao not found' });
          }

          return res.status(200).json(producao);
      } catch (error) {
          return res.status(400).json({ error, message: 'Request error, check and try again' });
      }
  }
  
  // Método para deletar uma producao pelo ID
  async deleteProducao(req: Request, res: Response) {
    const { producaoId, animalId } = req.params;

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
        
        const index = animal.producao.findIndex((producao: any) => producao.id === producaoId);
        
        const del = animal.producao.splice(index, 1);
       // findByIdAndUpdate pegando direto da model, não passa pelo service nem pelo repository
        const animalAtualizado = await Animal.findByIdAndUpdate(
          animalId,
          { $pull: { producoes: del[0] } },
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

        const deletedProducao = await this.producaoService.deleteProducao(producaoId);

        if (!deletedProducao) {
            return res.status(404).json({ message: 'Producao not found' });
        }

        return res.status(204).json({ message: 'Producao deleted successfully' });
    } catch (error) {
        return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
}
}