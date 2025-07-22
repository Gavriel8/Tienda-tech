import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct // Añadimos updateProduct para el PUT
} from '../controllers/products.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js'; // Importa el middleware de autenticación

const router = express.Router();

// Rutas de productos protegidas por autenticación
router.get('/', authenticateToken, getAllProducts); // GET /api/products
router.get('/:id', authenticateToken, getProductById); // GET /api/products/:id
router.post('/create', authenticateToken, createProduct); // POST /api/products/create
router.put('/:id', authenticateToken, updateProduct); // PUT /api/products/:id (para actualizar)
router.delete('/:id', authenticateToken, deleteProduct); // DELETE /api/products/:id

export default router;