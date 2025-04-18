import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";

router.post("/signup", authController.signup);

export default router;
