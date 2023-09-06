import { Request, Response } from "express";
import { AnimalService } from "../Services/AnimalService";
import { UsuarioService } from "../Services/usuarioService";
import Usuario from "../Models/usuario";

export class AnimalController {
  private animalService: AnimalService;
  private usuarioService: UsuarioService;
  static getAnimal: any; // Teste
  // Constutor da classe, onde é criada a instancia do animalService
  constructor() {
    this.animalService = new AnimalService();
    this.usuarioService = new UsuarioService();
  }

  // Método para criar um novo animal
  async createAnimal(req: Request, res: Response) {
    const { usuarioId } = req.params;
    const bodyData = req.body;
    try {
      const usuario = await this.usuarioService.getUsuarioById(usuarioId);
      if (!usuario) {
        return res.status(404).json({
          error: true,
          code: 404,
          message: `No usuario with id ${usuarioId}`,
        });
      }

      // Create the new animal
      const newAnimal = await this.animalService.createAnimal(bodyData);

      // Associate the new animal with the usuario by adding its ID to the usuario's animais array
      usuario.animal.push(newAnimal._id);
      await usuario.save();

      // Return the response with the newly created animal and usuarioId
      return res.status(201).json({ newAnimal, usuarioId: usuario._id, message: 'Animal created and associated with tutor successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para atualizar um animal existente
  async updateAnimal(req: Request, res: Response) {
      const { animalId } = req.params;
      const updatedData = req.body;

      try {
          const updatedAnimal = await this.animalService.updateAnimal(animalId, updatedData);

          if (!updatedAnimal) {
              return res.status(404).json({ message: 'Animal not found' });
          }

          return res.status(200).json({ updatedData, message: 'Animal updated successfully' });
      } catch (error) {
          return res.status(400).json({ error, message: 'Request error, check and try again' });
      }
  }

  // Método para obter todos os animais cadastrados, com os tutores associados
  async getAnimal(req: Request, res: Response) {
    try {
        // Chama o método getAnimal do AnimalService para obter a lista de animal
        const animais = await this.animalService.getAnimal();

        // Retorna a resposta com a lista de animal e um status de sucesso
        return res.status(200).json({ animais, message: 'Listing All animals' });
    } catch (error) {
        // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
        return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

    // Método para obter um animal específico pelo ID
    async getAnimalById(req: Request, res: Response) {
      const { animalId } = req.params;

      try {
          const animal = await this.animalService.getAnimalById(animalId);

          
          if (!animal) {
              return res.status(404).json({ message: 'Animal not found' });
          }

          return res.status(200).json(animal);
      } catch (error) {
          return res.status(400).json({ error, message: 'Request error, check and try again' });
      }
  }

  // Método para deletar um animal pelo ID
  async deleteAnimal(req: Request, res: Response) {
      const { animalId, usuarioId } = req.params;

      try {
          const usuario = await this.usuarioService.getUsuarioById(usuarioId);
          //const usuario = await Usuarios.findById(usuarioId);
        
          if (!usuario) {
            return res.status(404).json({
              error: true,
              code: 404,
              message: `No usuario with id ${usuarioId}`,
            });
          }
          
          const index = usuario.animal.findIndex((animal: any) => animal.id === animalId);
          
          const del = usuario.animal.splice(index, 1);
         // findByIdAndUpdate pegando direto da model, não passa pelo service nem pelo repository
          const usuarioAtualizado = await Usuario.findByIdAndUpdate(
            usuarioId,
            { $pull: { animais: del[0] } },
            { new: true }
          );
          if (!usuarioAtualizado) {
            return res
              .status(404)
              .json({
                error: true,
                code: 404,
                message: `error updating usuario with id ${usuarioId}`,
              });
          }

          const deletedAnimal = await this.animalService.deleteAnimal(animalId);

          if (!deletedAnimal) {
              return res.status(404).json({ message: 'Animal not found' });
          }

          return res.status(204).json({ message: 'Animal deleted successfully' });
      } catch (error) {
          return res.status(400).json({ error, message: 'Request error, check and try again' });
      }
  }
}