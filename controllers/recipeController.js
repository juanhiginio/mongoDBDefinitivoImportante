import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

const getAll = async (req, res) => {
    try {
        // Decirle que me traiga todas las recetas que en el campo deletedAt sea null -> Las recetas que no han sido eliminadas
        // .populate("nombrePropiedad donde va a almacenar los datos del modelo relacionado") -> Hacer un vinculo para conectar una receta con un User autor -> De esta manera nos trae todos los datos del modelo que le pasemos por parametro
        const recipes = await Recipe.find({ deletedAt: null }).populate("user");
        return res.json(recipes);
    } catch (err) {
        console.log(err);
        return res.json("Ups, sucedio un error");
    }
};

const getById = async (req,res) => {
    try {
        const idFind = req.params.id;
        const recipe = await Recipe.findById(idFind);

        return res.json(recipe);
    } catch (err) {
        console.log(err);
        return res.status(404).json(`Ups, sucedio un error encontrando el usuario con el id indicado`);
    }
};

const createRecipe = async (req, res) => {

    console.log(req.auth);

    try {
        const newRecipe = await Recipe.create({
            title: req.body.title,
            description: req.body.description,
            preparation: {
                ingredients: req.body.preparation.ingredients,
                cooking: req.body.preparation.cooking,
                total: req.body.preparation.total,
            },
            instructions: req.body.instructions,
            // Accedemos a la propiedad id que viene dentro del token al ser creado -> Por medio del método auth que se crea automaticamente al un usuario tenerun token o que se le haya generado un token
            user: req.auth.id,
        });
    
        return res.status(201).json(newRecipe);
    } catch(err) {
        console.log(err);
        res.status(501).json(`Ups!, ocurrio un error al crear una nueva receta`);
    }
};

const updateRecipe = async (req, res) => {
    try {

        const recipeToUpdate = await Recipe.findById(req.params.id);

        if (recipeToUpdate !== null) {

            const { title, description, preparation, instructions } = req.body;

            recipeToUpdate.title = title || recipeToUpdate.title;
            recipeToUpdate.description = description || recipeToUpdate.description;
            recipeToUpdate.preparation = preparation || recipeToUpdate.preparation;
            recipeToUpdate.instructions = instructions || recipeToUpdate.instructions;

            await recipeToUpdate.save();

            return res.json("La receta ha sido actualizada");

        } else {

            return res.json("No existe un una receta con el ID mencionado");

        }

    } catch (err) {

        console.log(err);
        return res.json("Ups, hubo un problema al editar la receta que buscaste");

    }
};

// Manera completamente destructiva -> Se elimina completamente de la base de datos
const deleteRecipe = async (req, res) => {

    try {
        // _id -> Para obtener el String del ID y que no lo tome como el objeto complejo en general
        const recipeToDelete = await Recipe.findById(req.params.id); 

        // Editar el dato deletedAt en el modelo, asignandole la fecha del moemento en que se intenta borrar y guardamos los cambios
        recipeToDelete.deletedAt = Date.now();
        recipeToDelete.save();

        return res.json("La receta se ha eliminado correctamente");

    } catch (err) {
        console.log(err);
        return res.json("Ups, hubo un error al eliminar el ususario con el ID que pasaste por parámetro");
    }
};

export default {
    getAll: getAll,    
    getById: getById,
    createRecipe: createRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe,
};