// Importamos el modulo para poder usar variables de entorno
import "dotenv/config";

import connectDB from "../config/database.js";
import User from "../models/User.js";

async function userSeeders() {

    connectDB();

    await User.create({
        firstName: "Leia",
        lastName: "Organa",
        email: "leia@starwars.com",
        // Valor almacenado en una variable de entorno
        password: process.env.SEEDER_USER_PASSWORD,
        age: 30,
    });
    await User.create({
        firstName: "Juan",
        lastName: "Higinio",
        email: "juan@gmail.com",
    // Valor almacenado en una variable de entorno
        password: process.env.SEEDER_USER_PASSWORD,
        age: 17
    });
    await User.create({
        firstName: "Andres",
        lastName: "Verde",
        email: "verde@hotmail.com",
        // Valor almacenado en una variable de entorno
        password: process.env.SEEDER_USER_PASSWORD,
        age: 25
    });

    console.log("[Seeder] Se han creado usuarios de prueba");
    process.exit(1); // Para que al momento en el que se ejecute, sea solo una vez y luego corte la ejecución del proceso

}

userSeeders();

// Para ejecutarlo -> En la terminal -> 
// node nombreCarpeta/nombreArchivo.js -> 
// node seeders/userSeeders.js