import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const auth: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).send('No token avaliable!')
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token,"jwtSecret")
        next()
    } catch (error) {
        res.status(401).send('Not authorized')
    }
}

export default auth