import { AnimalRepository } from "../Repositories/AnimalRepository";

/*----------------- *** Funcionalidades *** ----------------------*/
export class AnimalService{
  private animalRepository: AnimalRepository;

  constructor() {
    this.animalRepository = new AnimalRepository();
  }

  // Metodo para criar um novo animal
  async createAnimal(data: any) {
    try {
      // Chama o método createAnimal do AnimalRepository para criar um novo animal com os dados fornecidos
      return await this.animalRepository.createAnimal(data);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para atualizar um animal existente
  async updateAnimal(animalId: string, updatedData: any) {
    try {
      return await this.animalRepository.updateAnimal(animalId, updatedData);
    } catch (error) {
      throw error;
    }
  }

  // Método para obter todos os animais
  async getAnimal() {
    try {
      // Chama o método findAllAnimais do AnimalRepository para obter todos os animais cadastrados
      return await this.animalRepository.findAllAnimal();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter um animal específico pelo ID
  async getAnimalById(animalId: string) {
    try {
      return await this.animalRepository.findAnimalById(animalId);
    } catch (error) {
      throw error;
    }
  }

  // Método para deletar um animal pelo ID
  async deleteAnimal(animalId: string) {
    try {
      return await this.animalRepository.deleteAnimal(animalId);
    } catch (error) {
      throw error;
    }
  }
}