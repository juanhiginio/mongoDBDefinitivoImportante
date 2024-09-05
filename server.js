// Importamos el modulo para poder usar variables de entorno
import "dotenv/config";

import express from "express";
// Importamos la conexión a la base de datos
import connectDB from "./config/database.js";
// Importamos las rutas
import recipeRoutes from "./routes/recipeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authenticationRoutes from "./routes/authenticationRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

connectDB();

// Rutas
app.use(recipeRoutes);
app.use(userRoutes);
app.use(authenticationRoutes);


// Poner en escucha al servidor
app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});