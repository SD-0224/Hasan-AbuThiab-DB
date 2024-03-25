import { validationResult } from "express-validator";
import userService from "../services/userServices.js";
import jwt from 'jsonwebtoken';
const createUser = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    const user = await userService.createUser({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log("error creating user");
    throw err;
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.render("userList", { users: users });
  } catch (err) {
    console.log("error getting users");
    throw err;
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(req.userId)
    if (parseInt(userId) !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const user = await userService.getUserById(userId);
    res.render("userDetails", { user: user });
  } catch (err) {
    console.log("error getting user");
    throw err;
  }
};
const renderUpdate = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserById(userId);
    res.render("updateUser", { user: user });
  } catch (err) {
    console.log("error getting user");
    throw err;
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { userId } = req.params;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email } = req.body;
    console.log(req.body);
    const user = await userService.updateUser(userId, { username, email });
    res.status(201).json(user);
  } catch (err) {
    console.log("error updating user");
    throw err;
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.deleteUser(userId);
    res.status(201).json(user);
  } catch (err) {
    console.log("error deleting user");
    throw err;
  }
};

const loginUser = async (req, res) => {

  try
  {
    const { username, password } = req.body;
    const user = await userService.getUserbyName(username);
    if(!user || user.password !== password)
    {
      return res.status(400).json({success: false, message: "Invalid username or password"});
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({success: true, message: "Login successful", token: token});
    
  }
  catch(err)
  {
    console.log(err);
    res.status(400).json({success: false, message: err.message});
  }
}
export {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  renderUpdate,
  loginUser,
};
