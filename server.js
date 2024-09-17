// Importamos el modulo para poder usar variables de entorno
import "dotenv/config";

import express from "express";
// Importamos la conexión a la base de datos
import connectDB from "./config/database.js";
// Importamos las rutas
import recipeRoutes from "./routes/recipeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authenticationRoutes from "./routes/authenticationRoutes.js";

// Importamos path y fs
import fs from "fs"; // file System -> Permite acceder a los archivos del servidor 
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());

connectDB();

// Creamos las rutas -> carpeta raiz + public/uploads
const uploadDir = path.join(import.meta.dirname, 'public/uploads');

// Condicional para que en caso de que no exista la carpeta indicada, esta se cree automaticamente -> Para evitar errores
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
};

// Rutas
app.use(recipeRoutes);
app.use(userRoutes);
app.use(authenticationRoutes);
app.use(orderRoutes);


// Poner en escucha al servidor
app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});