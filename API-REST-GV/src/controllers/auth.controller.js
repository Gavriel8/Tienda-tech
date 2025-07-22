import * as authService from '../services/auth.service.js';

// Controlador para el login de usuario
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ status: 200, message: 'Autenticación exitosa.', token });
  } catch (error) {
    // Si el error es de autenticación, devuelve 401
    if (error.message === 'Credenciales inválidas.') {
      return res.status(401).json({ status: 401, message: error.message });
    }
    next(error); // Pasa otros errores al middleware global
  }
};

export {
  login
};