import Order from "../models/Order.js";
import Recipe from "../models/Recipe.js";

async function getAll(req, res) {
    try {
        const orders = await Order.find({ deletedAt: null })
        .populate("user", ["-password"]) // Traer todos los atributos de user MENOS password // Aquí tambien podemos poner solo los datos que queremos que traiga -> [password] -> En este caso solo traera el password
        .populate("products.product");
        return res.json(orders);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Ups, hubo un error"
        });
    }
}

async function getById(req, res) {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Ups, hubo un error"
        });
    }
}

async function create(req, res) {
    try {

        const newOrder = await Order.create({
            products: req.body.products,
            // El usuario viene verificado por medio del token, por esto viene en la propiedad auth
            user: req.auth.id,
            total: req.body.total,
            paymentMethod: req.body.paymentMethod
        });
        return res.json("Orden creada exitosamente");
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Ups, hubo un error"
        });
    }
}

async function updateOrder(req, res) {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Ups, hubo un error"
        });
    }
}

async function deleteOrder(req, res) {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Ups, hubo un error"
        });
    }
}

export default {
    getAll: getAll,
    getById: getById,
    create: create,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder
};