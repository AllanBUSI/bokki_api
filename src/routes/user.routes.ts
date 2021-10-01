import express from "express";
const router = express.Router();

router.get("/user");
router.post("/users");
router.put("/user");
router.delete("/user");

export default router;

