import * as productsService from '../services/products.service.js';

// Controlador para obtener todos los productos
const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

// Controlador para obtener un producto por ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product) {
      return res.status(404).json({ status: 404, message: 'Producto no encontrado.' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Controlador para crear un nuevo producto
const createProduct = async (req, res, next) => {
  try {
    const newProductData = req.body;
    const createdProduct = await productsService.createProduct(newProductData);
    res.status(201).json({ status: 201, message: 'Producto creado exitosamente.', data: createdProduct });
  } catch (error) {
    // Si el error es una validación de negocio, devuelve 400
    if (error.message.includes('inválidos') || error.message.includes('requeridos')) {
      return res.status(400).json({ status: 400, message: error.message });
    }
    next(error);
  }
};

// Controlador para actualizar un producto
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedProduct = await productsService.updateProduct(id, updatedData);
    if (!updatedProduct) {
      return res.status(404).json({ status: 404, message: 'Producto no encontrado para actualizar.' });
    }
    res.json({ status: 200, message: 'Producto actualizado exitosamente.', data: updatedProduct });
  } catch (error) {
    if (error.message.includes('inválidos') || error.message.includes('requeridos')) {
      return res.status(400).json({ status: 400, message: error.message });
    }
    next(error);
  }
};

// Controlador para eliminar un producto
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const wasDeleted = await productsService.deleteProduct(id);
    if (!wasDeleted) {
      return res.status(404).json({ status: 404, message: 'Producto no encontrado para eliminar.' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};