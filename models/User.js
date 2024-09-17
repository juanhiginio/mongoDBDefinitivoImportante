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
    avatar: String, // Ya que este almacenara la ruta de la imagen, y no la imagen en sí
    age: Number,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true,
    // Para que se puedan crear propiedades virtuales
    toJSON: {
        virtuals: true,
    }
}
);

// Propiedades virtuales -> Propiedades que no se veran reflejadas en la base de datos, solo existen de manera virtual

// Creamos una propiedad virtual llamada fullname que me va a OBTENER (get) 
userSchema.virtual("fullName").get(function() {
    return this.firstName + " " + this.lastName;
});

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