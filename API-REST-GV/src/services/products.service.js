import * as productsModel from '../models/products.model.js';

// Servicio para obtener todos los productos
const getAllProducts = async () => {
  return await productsModel.getAllProducts();
};

// Servicio para obtener un producto por ID
const getProductById = async (id) => {
  return await productsModel.getProductById(id);
};

// Servicio para crear un nuevo producto
const createProduct = async (productData) => {
  // Lógica de negocio: validaciones antes de guardar
  if (!productData.nombre || typeof productData.precio !== 'number' || productData.precio <= 0 || !productData.categoria) {
    throw new Error('Datos de producto inválidos: nombre, precio y categoría son requeridos y el precio debe ser un número positivo.');
  }
  // Podríamos añadir más lógica, como generar un slug, validar stock, etc.
  return await productsModel.createProduct(productData);
};

// Servicio para actualizar un producto
const updateProduct = async (id, updatedData) => {
  // Lógica de negocio: validaciones para la actualización
  if (typeof updatedData.precio !== 'undefined' && (typeof updatedData.precio !== 'number' || updatedData.precio <= 0)) {
    throw new Error('El precio del producto debe ser un número positivo.');
  }
  // Aquí podríamos verificar si el producto existe antes de intentar actualizarlo en el modelo
  const product = await productsModel.updateProduct(id, updatedData);
  return product; // El modelo devuelve undefined si no lo encuentra, lo cual se maneja en el controlador
};

// Servicio para eliminar un producto
const deleteProduct = async (id) => {
  // Lógica de negocio antes de eliminar: por ejemplo, verificar si el producto está en pedidos activos
  const wasDeleted = await productsModel.deleteProduct(id);
  return wasDeleted; // El modelo devuelve true/false, lo cual se maneja en el controlador
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};