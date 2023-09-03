import { Request, Response } from "express";
import Tt from "../Models/usuario";
import { v4 as uuidv4 } from 'uuid';

// Cria animal add em tutor
export async function CreatePet(req: Request, res: Response){
  //console.log(req.params);

  const pet = req.body;
  pet.id = uuidv4();
  const id = req.params.tutorId;

  try{
    const tt = await Tt.findById(id);
    if (!tt){
      return res.status(404).send(`Tutor: ${id}, for the pet: ${pet.name}, isn't found!`);
    }
    tt.pets.push(pet);
    await tt.save();
    return res.status(200).send(`Pet: ${pet.name}, added.`)
  } catch (e){
    res.status(500).json({ error: e });
  }
}

// Att inf animal
export async function UpdatePet(req: Request, res: Response){
  //console.log(req.params);

  const id = req.params.petId;
  const tt = req.params.tutorId;


  const { name, species, carry, weight, date_of_birth } = req.body;

  if(!name || !species || !carry || !weight || !date_of_birth){
    return  res.status(400).send('Please enter all fields correctly'); 
  }

  try {
      const ttFind = await Tt.findById(tt);
      if(!ttFind){
        return res.status(404).send(`Tutor id: ${tt}, or the pet: ${name}, isn't found!`);
      }
      let petFind = ttFind.pets.find((petUp) => petUp.id === id);
      if (!petFind) {
        return res.status(404).send('Pet not found!');
      }

      //petFind = pet;
      petFind.name = name;
      petFind.species = species;
      petFind.category = carry;
      petFind.weight = weight;
      petFind.date_of_birth = date_of_birth;

      ttFind.markModified('pets');
      await ttFind.save();

      return res.status(200).send(`Pet: ${petFind.name}, updated.`);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// Del animal
export async function DeletePet(req:Request, res: Response){
  //console.log(req.params);

  const id = req.params.petId;
  const tt = req.params.tutorId;
  try{
    const ttFind = await Tt.findById(tt);
    if(!ttFind){
      return res.status(404).send(`Tutor id: ${tt}, isn't found!`);
    }

    const petIndex = ttFind.pets.findIndex((pet) => pet.id === id)
    if (petIndex === -1) {
      return res.status(404).send(`pet id: ${id}, isnt found!`)
    }
    ttFind.pets.splice(petIndex, 1)
    ttFind.markModified('pets')
    await ttFind.save()
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error })
  }
}