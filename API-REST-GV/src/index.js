import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Importa los enrutadores
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const port = process.env.PORT || 3000; // Usa el puerto del .env o 3000 por defecto

// Middleware para habilitar CORS
app.use(cors());

// Middleware global para interpretar los cuerpos de las peticiones en formato JSON
app.use(express.json());

// --- Rutas de la API ---
// Monta el enrutador de autenticación
app.use('/auth', authRoutes);
// Monta el enrutador de productos
app.use('/api/products', productsRoutes);

// --- Middleware para manejar rutas desconocidas (404 Not Found) ---
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: `Ruta no encontrada: ${req.originalUrl}`,
    error: 'La URL solicitada no existe en este servidor.'
  });
});

// --- Middleware de manejo de errores global (500 Internal Server Error) ---
// Este middleware captura errores que no fueron manejados por rutas o middlewares anteriores
app.use((err, req, res, next) => {
  console.error(err.stack); // Registra el error en la consola del servidor
  res.status(500).json({
    status: 500,
    message: 'Error interno del servidor.',
    error: err.message
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});