import User from "../models/User.js";

import bcrypt from "bcryptjs";

async function login(req, res) {

    // Buscamos el usuario por su email
    const user = await User.findOne( { email: req.body.email } );

    // Validación de si el usuario existe
    if (user) {
        // En caso de que exista, vamos a comparar su contraseña...

        // 1er Parametro -> String que queremos comparar 
        // 2do Parametro ->  String con el que queremos comparar -> Accedemos a la prpiedad password que ya esta hasheada de la busqueda del usuario hecha al principio
        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) { // Si match es igual a true
            return res.json("Te damos la bienvenida -> (Las credenciales coinciden)");
        };
    };

    return res.json("Acceso denegado, las credenciales no coinciden");

};

export default { login };