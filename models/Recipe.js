import mongoose from "mongoose";
import User from "./User.js"; // Importamos el modelo de usuario para hacer referencia a su objectId en la relación
import { type } from "os";

// Modelo Recetas con validaciones 
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
      ///  required: true, Decir que el dato es obligatorio
      required: [true, "Title is required"],
    },
    description: String,
    preparation: {
        ingredients: String,
        cooking: String,
        total: String,
    },
    instructions: [String],
    // Aquí se almacenará la fecha en la que se hizo la "eliminación" del modelo
    deletedAt: {
        type: Date,
        default: null,
    },
    user: {
        // Lugar donde se almacena la relación del id de un usuario en el apartado User de Receta 
        // Para esto usamos la propiedad type: con el valor especíal de mongoose.Types.ObjectId
        type: mongoose.Types.ObjectId,
        // Aquí indicamos a que ObjectId queremos hacer referencia
        ref: "User",
    }
}, {
    // Aquí se poenen caracteristicas generales para todas las propiedades
    // timestamps -> Agrega propiedad de la fecha de creación y actualización de la propiedad
    timestamps: true,
});

const Recipe = mongoose.model("Recipe", recipeSchema); // Modelo Receta

// Exportamos el modelo de la Receta ya que es lo que vamos a usar en otros documentos
export default Recipe;