import { Request, Response } from 'express';
import Usuario from '../Models/usuario';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const AuthController = {
    async Login(req: Request, res: Response) {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({email}).select("+senha");
        
        if (!email) {
            return res.status(422).json({ message: 'Email is required!' });
        }
        if (!senha) {
            return res.status(422).json({ message: 'Password is required!' });
        }

        if (!usuario) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!senha || !usuario.senha) {
            return res.status(400).json({ error: true, code: 400, message: "Invalid email or password" });
        }

        // Verificando se as senhas são iguais
        const checkSenha = await bcrypt.compare(senha, usuario.senha);

        if (!checkSenha) {
            return res.status(401).json({ error: true, code: 401, message: "Invalid email or password"});
        }
        const secret = `${process.env.JWT_SECRET }`;
        const token = jwt.sign({ id: usuario._id },secret,{expiresIn:process.env.JWT_EXPIRATION});
      
        return res.status(200).json({ access_token:token });
    },
};

export default AuthController;