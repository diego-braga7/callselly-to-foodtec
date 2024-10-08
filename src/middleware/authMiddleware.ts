import { Request, Response, NextFunction } from "express";

const USERNAME = process.env.API_USERNAME || "admin";
const PASSWORD = process.env.API_PASSWORD || "password";

// Função para verificar o cabeçalho Authorization e fazer a autenticação básica
export const basicAuth = (req: Request, res: Response, next: NextFunction): void => {
  // Verifica se o cabeçalho de autorização está presente
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic");
    res.status(401).json({ message: "Autenticação necessária" });
    return; // Explicitamente encerra o middleware após enviar a resposta
  }

  // Extrai e decodifica o token Base64 (parte após "Basic ")
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  
  // Separa o nome de usuário e senha
  const [username, password] = credentials.split(":");

  // Verifica se o nome de usuário e senha são válidos
  if (username === USERNAME && password === PASSWORD) {
    next(); // Autenticação bem-sucedida, continue para o próximo middleware
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
};
