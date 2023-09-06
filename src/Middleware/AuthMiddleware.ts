// Importações
import jwt from 'jsonwebtoken'; // Biblioteca para trabalhar com JSON Web Tokens (JWT)
import express from "express"; // Biblioteca para criar aplicativos web em Node.js
import Usuario from "../Models/usuario"; // Supondo que exista um modelo "Usuario" definido em "../Models/usuario"

// Middleware de autenticação
const AuthMiddleware = async (req:express.Request, res: express.Response, next:express.NextFunction)=> {
  try {
      // Obtém o cabeçalho de autorização da requisição
      const authorizationHeader = req.headers.authorization;
      
      // Verifica se o cabeçalho de autorização está presente na requisição
      if (!authorizationHeader) {
          return res.status(401).json({ error: true, code: 401, message: "Authentication invalid, unauthorized" });
      }

      // Divide o cabeçalho de autorização para extrair o token JWT
      const token = authorizationHeader.split(" ");

      // Verifica se o formato do token é válido (esperado: "Bearer <token>")
      if (token.length !== 2 || token[0] !== "Bearer") {
          return res.status(401).json({ error: true, code: 401, message: "Invalid token format" });
      }

      // Obtém a chave secreta da variável de ambiente
      const secret = `${process.env.JWT_SECRET }`;

      // Decodifica o token JWT usando a chave secreta
      const decoded = jwt.verify(token[1], secret);
  
      // Verifica se ocorreu um erro na decodificação do token
      if (typeof decoded === 'string') {
          return res.status(401).json({ error: true, code: 401, message: "Decoded is a string" });
      }

      // Busca o usuario no banco de dados usando o ID obtido do token decodificado
      const usuario = await Usuario.findById(decoded.id);

      // Verifica se o usuario foi encontrado no banco de dados
      if (!usuario) {
          return res.status(404).json({ error: true, code: 404, message: "Usuario not found" });
      }

      // Armazena o ID do usuario na requisição para uso em rotas subsequentes
      const usuarioId = decoded.id;
      req = usuarioId;
      
      // Chama o próximo middleware ou rota
      next();
  } catch (error) {
      // Em caso de erro, registra o erro no console e retorna um erro de autenticação
      return res.status(401).json({
          error: true, code: 401, message: "Not authorized" });
  }
};

// Exporta o middleware de autenticação para ser utilizado por outras partes da aplicação
export default AuthMiddleware;