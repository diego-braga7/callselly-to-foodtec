import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Use uma variável de ambiente para isso em produção

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
