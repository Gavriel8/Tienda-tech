import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Usuario de prueba (en una aplicación real, esto vendría de una base de datos)
const TEST_USER = {
  username: 'admin',
  password: 'password123' // En una aplicación real, la contraseña estaría hasheada
};

// Servicio para la lógica de autenticación
const login = async (username, password) => {
  // Validar credenciales (simulado)
  if (username === TEST_USER.username && password === TEST_USER.password) {
    // Generar token JWT
    const payload = { username: TEST_USER.username, role: 'admin' };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' }; // El token expira en 1 hora

    const token = jwt.sign(payload, secret, options);
    return token;
  } else {
    throw new Error('Credenciales inválidas.');
  }
};

export {
  login
};