import upload from "../config/multerConfig.js";

import { expressjwt } from "express-jwt";
import userController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/api/users", userController.getAll);
// Aplicamos el upload como un middleware, y le pasamos el metodo single para indicar que vamos a mandar solo 1 archivo
router.post("/api/users", upload.single("avatar"),userController.create);
router.get("/api/my-recipes", expressjwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }) ,userController.myRecipes);

export default router;