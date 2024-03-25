import { Router } from "express";
const router = Router();
import {
  createUser,
  getAllUsers,
  getUserById,
  renderUpdate,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";
import { createUserValidator } from "../middlewares/validator.js";
import { verifyToken } from "../middlewares/jwtToken.js";

router.get("/create", (req, res) => {
  res.render("createUser");
});
router.get("/login", (req, res) => { 
  res.render("login");
});
router.post("/login",loginUser);
router.post("/create", createUserValidator, createUser);
router.get("/", getAllUsers);
router.get("/:userId", verifyToken, getUserById);
router.get("/update/:userId", renderUpdate);
router.put("/:userId", createUserValidator, updateUser);
router.delete("/delete/:userId", deleteUser);

export default router;
