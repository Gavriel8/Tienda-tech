import { db, collection, addDoc } from './config/firebase.config.js';
import { promises as fs } from 'fs';
import path from 'path';
const __dirname = import.meta.dirname;

const initialProductsPath = path.join(__dirname, 'data', 'initialProducts.json');

const populateFirestore = async () => {
  try {
    const data = await fs.readFile(initialProductsPath, 'utf8');
    const products = JSON.parse(data);

    console.log(`Cargando ${products.length} productos en Firestore...`);

    // Referencia a la colección 'products'
    const productsCollection = collection(db, 'products');

    for (const product of products) {
      // Firestore generará automáticamente el ID del documento
      await addDoc(productsCollection, product);
      // console.log(`Producto añadido: ${product.nombre}`); // Opcional: descomentar para ver progreso
    }

    console.log('¡Todos los productos han sido cargados exitosamente en Firestore!');
  } catch (error) {
    console.error('Error al cargar productos en Firestore:', error);
    console.error('Asegúrate de que FIREBASE_API_KEY y otras variables de .env estén configuradas correctamente.');
    console.error('También verifica que las reglas de seguridad de Firestore permitan escritura (write).');
  }
  // Si usas un script independiente, es buena práctica salir del proceso de Node.js
  process.exit(0);
};

populateFirestore();