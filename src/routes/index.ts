import express, { Request, Response } from "express";
const router = express.Router();
import user from '@routes/user.routes'
import auth from '@routes/auth.routes'

router.use("/auth", auth);
router.use("/", user);

export default router;


