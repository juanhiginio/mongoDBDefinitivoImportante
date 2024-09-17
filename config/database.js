import mongoose from "mongoose";

// .connect recibe como parametro la dirección en el que esta el servidor corriendo, o la que tenemos en mongoose y adicionalmente agregarle el nombre de la base de datos

// Promesas asyncronas con try y catch
async function connectDB() {
    try {
        const connection = await mongoose.connect(
            // ESTO DEBERIA IR EN UNA VARIABLE DE ENTORNO PARA MAYOR SEGURIDAD -> LINK DE MONGO DB ATLAS PARA CONEXIÓN A BASE DE DATOS REMOTA 
            "mongodb+srv://juanhiginio06:04JDUgoiPzlFWsrR@basedatosprueba.mhvhc.mongodb.net/probandoBaseDeDatosRemota"
        );
        console.log("Se ha establecido conexión a la base de datos");
    } catch(err) {
        console.log(err);
        //Para que al momento en que se presente un error se corte el servidor y pare de ejecutarse 
        process.exit(1);
    }
};

export default connectDB;