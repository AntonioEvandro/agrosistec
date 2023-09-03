import { Request, Response } from "express";
import usuario from "../models/model";
import animal from "../models/animal";

/*----------------- *** Funcionalidades *** ----------------------*/
// Exibir animais
export async function Animais(req:Request, res: Response) {
  try {
    const user = await usuario.findById(req.params.id);
    if(!user){
      return res.status(404).send(`User id: ${req.params.id}, isn't found!`);
    }
    const animais = user.animal.find();
    if (!animais) {
      return res.status(404).send('Animals not found!');
    }

    res.status(200).json(animais)
  } catch (error) {
    res.status(500).json({error: error})
  }
}