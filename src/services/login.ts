import { Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import Tt from '../models/model'

export async function login (req: Request, res: Response){
  const { email, password } = req.body

  if(!email || !password){
    return res.status(400).send(`Please enter all fields correctly`) 
  }

  const exist = await Tt.findOne({email:email})
  if(!exist || exist.password != password){
    return res.status(400).send('incorrect password or Unregistered user')
  }
  const id = exist._id
  const token = jwt.sign({id, email},"jwtSecret",{expiresIn:'3d'})

  return res.status(200).json({token})
}