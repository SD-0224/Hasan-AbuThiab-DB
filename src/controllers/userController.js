import { validationResult } from "express-validator";
import db from "../models/Index.js";
const createUser = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    const user = await db.User.create({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log("error creating user");
    throw err;
  }
};

export default createUser;