import Animal from "../Models/animal";

export class AnimalRepository {
    // Método para criar um novo animal no banco de dados
    async createAnimal(data: any) {
        try {
            return await Animal.create(data);
        } catch (error) {
            throw error;
        }
    }

    // Método para atualizar um animal existente no banco de dados
    async updateAnimal(animalId: string, updatedData: any) {
        try {
            return await Animal.findByIdAndUpdate(animalId, updatedData);
        } catch (error) {
            throw error;
        }
    }
    
  // Método para obter todos os animais cadastrados no banco de dados
    async findAllAnimal() {
        try {
            // Chama o método find do modelo animal para obter todos os animais cadastrados
            return await Animal.find().populate(['evento','alimentacao','producao']).exec();
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }

    // Método para obter um animal específico pelo ID no banco de dados
    async findAnimalById(animalId: string) {
        try {
            return await Animal.findById(animalId);
        } catch (error) {
            throw error;
        }
    }

    // Método para deletar um animal pelo ID no banco de dados
    async deleteAnimal(animalId: string) {
        try {
            return await Animal.findByIdAndDelete(animalId);
        } catch (error) {
            throw error;
        }
    }
}
