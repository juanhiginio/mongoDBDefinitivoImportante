import authenticationController from "../controllers/authenticationController.js";
import express from "express";

const router = express.Router();

router.post("/api/login", authenticationController.login);

export default router;