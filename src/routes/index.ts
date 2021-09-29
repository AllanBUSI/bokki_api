import express, { Request, Response } from "express";
const router = express.Router();
import auth from '@routes/auth.routes'

router.use("/auth", auth);


