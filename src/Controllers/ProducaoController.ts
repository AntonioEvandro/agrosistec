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
  
}