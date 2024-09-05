import mongoose from "mongoose";
// Importamos bcryptjs para hacer el hasheo de la contraseña
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: {
        type: String,
        required: true,
    },
    email: String,
    password: {
        type: String,
        required: true,
    },
    age: Number,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true,
}
);

// "Middleware" -> Función que se ejecuta previo al guardado 
// Antes de guardar un usuario, ejecutar esta función
userSchema.pre("save", async function (next) {
    // Contraseña Hasheada con el bcrypt
    const passwordHash = await bcrypt.hash(this.password, 10); // this tiene acceso al modelo de usuario completo
    // Agarramos el parametro password y le asignamos el metodo almacenado en passwordHash -> Para que CUALQUIER usuario antes de ser creado se le hashea su contraseña
    this.password = passwordHash;
    // Para que continue con el guardado de el usuario
    next();
});

const User = mongoose.model("User", userSchema);

export default User;