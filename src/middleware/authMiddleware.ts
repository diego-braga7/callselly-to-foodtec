import { Request, Response, NextFunction } from "express";

const USERNAME = process.env.API_USERNAME || "admin";
const PASSWORD = process.env.API_PASSWORD || "password";

export const basicAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic");
    res.status(401).json({ message: "Autenticação necessária" });
    return; 
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  
  const [username, password] = credentials.split(":");

  if (username === USERNAME && password === PASSWORD) {
    next(); 
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
};
