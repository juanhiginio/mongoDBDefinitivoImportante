import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        products: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: "Recipe"
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        total: Number,
        shippingAdress: String,
        paymentMethod: {
            type: String,
            // enum -> Restricción - Solo se pueden ingresar uno de los valores indicados, si se ingresa algo diferente es incorrecto
            enum: ["credit_card", "paypal"],
            required: true,
        }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order; 

