import recipeController from "../controllers/recipeController.js";
import express from "express";

// Importamos midelware de ruta para valídar los TOKENS
import { expressjwt } from "express-jwt"; 

const router = express.Router();

router.get("/api/recipes", recipeController.getAll);
router.get("/api/recipes/:id", recipeController.getById);

// Ruta Privada -> Para crear un receta se debe ser un usuario en el sistema
// expressjwt() -> Midelware para valídar los tokens -> Recibe 2 parámetros
// 1ero -> secret -> Un objeto -> { secret: ClaveSeguraEnVariablesDeEntorno -> Para identificar que si sea un token creado por nosotros }
// 2do -> algorithms -> Decirle a traves de que algoritmo se ha elaborado el TOKEN
router.post("/api/recipes/", expressjwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }), recipeController.createRecipe);

router.patch("/api/recipes/:id", recipeController.updateRecipe);
router.delete("/api/recipes/:id", recipeController.deleteRecipe);

/*
// -> Buscar una receta por un campo distinto al ID, y retorna un array de todas las recetas que tengan el nombre Receta 1 en el title
// -> Buscamos y todo lo que coincida con la validación lo retorna en un array 
router.get("/api/recipes/test", async (req, res) => {
    const recipe = await Recipe.find({title: "Receta 1"});
    res.json(recipe);
});
*/

export default router;