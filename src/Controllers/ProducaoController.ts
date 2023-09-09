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
  
}