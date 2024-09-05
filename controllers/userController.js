import User from "../models/User.js";

async function create(req, res) {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
        });
        return res.json("Un nuevo usuario ha sido creado");
    } catch (err) {
        console.log(err);
        return res.status(501).json("Ups, ocurrio un error al crear un usuario");
    }
}

export default create;