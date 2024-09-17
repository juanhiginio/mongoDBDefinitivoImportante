import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

const getAll = async (req, res) => {
    try {
        // Decirle que me traiga todas las recetas que en el campo deletedAt sea null -> Las recetas que no han sido eliminadas
        // .populate("nombrePropiedad donde va a almacenar los datos del modelo relacionado") -> Hacer un vinculo para conectar una receta con un User autor -> De esta manera nos trae todos los datos del modelo que le pasemos por parametro
        const users = await User.find({ deletedAt: null });
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.json("Ups, sucedio un error");
    }
};

async function create(req, res) {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            avatar: req.file.filename, // request propiedad file gracias a multer para subir archivos 
            age: req.body.age,
        });
        return res.json("Un nuevo usuario ha sido creado");
    } catch (err) {
        console.log(err);
        return res.status(501).json("Ups, ocurrio un error al crear un usuario");
    }
}

async function myRecipes(req, res) {
    const userRecipe = await Recipe.find({ user: req.auth.id }) // Encontramos todas las recetas que en user tengan el ID indicado en auth (TOKEN)

    return res.json(userRecipe);
}

export default {
    create: create,
    getAll: getAll,
    myRecipes: myRecipes
};