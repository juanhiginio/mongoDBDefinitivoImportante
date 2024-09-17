import User from "../models/User.js";
// Importamos módulo de jsonwebtoken -> Para elaborar y entregar una llave de acceso
import jwt from "jsonwebtoken";
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
            // Elaborar y entregar una llave de acceso (TOKEN)

            //.sign() -> Método de jwt -> Recibe 2 parametros ->
            // 1ero -> 1 Objeto -> Lugar donde vamos a poder guardar información que este dentro de la llave (TOKEN)
            // 2do -> 1 String -> Clave que va a ir en el token para identificarlo -> Todos los tokens van a estar firmados por medio de este String Secreto, para reconocer si es un TOKEN creado por nosotros

            // Generación de la llave (TOKEN) con la información necesitada
            const token = jwt.sign({ prueba: "123", id: user.id }, process.env.JWT_SECRET_STRING);
            return res.json({ token: token }); // Entregar al usuario la llave (TOKEN)
        };
    };
 
    return res.json("Acceso denegado, las credenciales no coinciden");

};

export default { login };