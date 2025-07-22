import { db, collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from '../config/firebase.config.js';

// Referencia a la colección 'products' en Firestore
const productsCollection = collection(db, 'products');

/**
 * Obtiene todos los productos de Firestore.
 * @returns {Promise<Array>} Una promesa que resuelve con un array de productos.
 */
const getAllProducts = async () => {
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => ({
    id: doc.id, // El ID del documento de Firestore
    ...doc.data()
  }));
  return productsList;
};

/**
 * Obtiene un producto por su ID de Firestore.
 * @param {string} id - El ID del documento de Firestore.
 * @returns {Promise<Object|undefined>} Una promesa que resuelve con el producto encontrado o undefined.
 */
const getProductById = async (id) => {
  const productDocRef = doc(db, 'products', id);
  const productSnapshot = await getDoc(productDocRef);
  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() };
  }
  return undefined;
};

/**
 * Crea un nuevo producto en Firestore.
 * @param {Object} newProductData - Los datos del nuevo producto.
 * @returns {Promise<Object>} Una promesa que resuelve con el producto creado (incluyendo su ID de Firestore).
 */
const createProduct = async (newProductData) => {
  const docRef = await addDoc(productsCollection, newProductData);
  return { id: docRef.id, ...newProductData };
};

/**
 * Actualiza un producto existente en Firestore.
 * @param {string} id - El ID del documento de Firestore a actualizar.
 * @param {Object} updatedData - Los nuevos datos del producto.
 * @returns {Promise<Object|undefined>} Una promesa que resuelve con el producto actualizado o undefined si no se encontró.
 */
const updateProduct = async (id, updatedData) => {
  const productDocRef = doc(db, 'products', id);
  const productSnapshot = await getDoc(productDocRef); // Verifica si el documento existe
  if (!productSnapshot.exists()) {
    return undefined; // Producto no encontrado
  }
  await updateDoc(productDocRef, updatedData);
  return { id: productDocRef.id, ...productSnapshot.data(), ...updatedData }; // Devuelve el producto actualizado
};

/**
 * Elimina un producto de Firestore.
 * @param {string} id - El ID del documento de Firestore a eliminar.
 * @returns {Promise<boolean>} Una promesa que resuelve a true si se eliminó, false si no se encontró.
 */
const deleteProduct = async (id) => {
  const productDocRef = doc(db, 'products', id);
  const productSnapshot = await getDoc(productDocRef); // Verifica si el documento existe
  if (!productSnapshot.exists()) {
    return false; // Producto no encontrado
  }
  await deleteDoc(productDocRef);
  return true;
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};