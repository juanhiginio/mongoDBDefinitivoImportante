import recipeController from "../controllers/recipeController.js";
import express from "express";

const router = express.Router();

router.get("/api/recipes", recipeController.getAll);
router.get("/api/recipes/:id", recipeController.getById);
router.post("/api/recipes/", recipeController.createRecipe);
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