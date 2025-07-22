import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  // Obtiene el token del header de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

  if (token == null) {
    // Si no hay token, devuelve 401 (Unauthorized)
    return res.status(401).json({ status: 401, message: 'Acceso denegado. No se proporcionó token de autenticación.' });
  }

  // Verifica el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Si el token no es válido o expiró, devuelve 403 (Forbidden)
      return res.status(403).json({ status: 403, message: 'Token inválido o expirado.' });
    }
    req.user = user; // Almacena la información del usuario en el objeto request
    next(); // Continúa con la siguiente función middleware/controlador
  });
};

export {
  authenticateToken
};