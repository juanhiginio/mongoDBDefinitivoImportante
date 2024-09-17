import express from "express";

import { expressjwt } from "express-jwt";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.post("/api/orders", expressjwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }), orderController.create);
router.get("/api/orders", orderController.getAll);

export default router;