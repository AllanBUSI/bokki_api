import { authLoginController } from "@controllers/auth.controller";
import { authForgotPasswordMiddleware, authLoginMiddleware, authNewPasswordMiddleware, authRegisterMiddleware } from "@middlewares/auth.middleware";
import express from "express";
const router = express.Router();

router.post("/login", authLoginMiddleware, authLoginController);
router.post("/register", authRegisterMiddleware, authRegisterController);
router.post("/password",authForgotPasswordMiddleware , authRegisterController);
router.post("/new/password",authNewPasswordMiddleware , authRegisterController);

