import { Request, Response } from "express"
import Tt from "../models/usuario";

/*--------------------funções--------------------------------*/
// todos tutores
export async function Tutors(req: Request, res: Response){

  try {
    const tutors = await Tt.find()

    res.status(200).json(tutors)
  } catch (error) {
    res.status(500).json({error: error})
  }
}

// Criar tutor
export async function CreateTutor(req: Request, res: Response) {
  //console.log(req.body);
  
  const tutor: any = req.body;
  const exist = await Tt.findOne({email: req.body.email})
  if (exist){
    return res.status(400).send('E-mail already registered')
  }
  try{
    await Tt.create(tutor);
    return res.status(200).send("Tutor has been added!");
  }
  catch(e){
      res.status(500).json({error: e})
  }
  
}

// Obter tutor especifico
export async function TutorById(req: Request, res: Response){
  //console.log(req.params);
  
  const id = req.params.id;
  
  try{
    const ttid = await Tt.findById(id)
    if (ttid){
      return res.status(200).json(ttid);
    }
    return res.status(404).send("Tutor not found!");
  } catch (error){
    res.status(500).json({error: error});
  }
}

// Atualizar tutor
export async function UpdateTutor(req: Request, res: Response){
  //console.log(req.params);

  const id = req.params.id;

  try{
    const ttFind = await Tt.findById(id)
    if (!ttFind) {
      return res.status(404).send('Tutor not found!')
    }
    await Tt.updateOne({_id: id}, req.body);
    return res.status(200).send(`Tutor has updated.`);
  } catch (e) {
    res.status(500).json({error: e})
  }
}

// Deletar tutor
export async function DelTutor(req: Request, res: Response){
  //console.log(req.params);
  const id: string = req.params.id;
  //console.log(id);

  try{
    const ttfind = await Tt.findById(id);
    if (!ttfind){
      return res.status(404).send("Tutor not found!");
    }
    if (ttfind.pets.length > 0){
      return res.status(404).send(`Tutor cannot be deleted while it has pet(s) associated with it`);
    }
    await Tt.deleteOne({_id: id});
    return res.status(204).send();
  } catch(e){
    return res.status(500).send(`Error, unable to delete tutor`)
  }
}
