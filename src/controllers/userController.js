import { validationResult } from "express-validator";
import userService from "../services/userServices.js";
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
const getAllUsers = async (req,res) =>
{
  try{
    const users = await userService.getAllUsers();
    res.render('userList', {users: users});
  }
  catch(err)
  {
    console.log("error getting users");
    throw err;
  }
}

const getUserById = async (req, res) => {
  const {userId} = req.params
  try{
    const user = await userService.getUserById(userId);
    res.render('userDetails', {user: user});
  }
  catch(err)
  {
    console.log("error getting user");
    throw err;
  }
}
const renderUpdate = async (req, res) => {
  const {userId} = req.params 
  try
  {
    const user = await userService.getUserById(userId);
    res.render('updateUser', {user: user});
  }
  catch(err)
  {
    console.log("error getting user");
    throw err;
  }

}

const updateUser = async (req, res) =>
{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
  }
  
  const {userId} = req.params
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email } = req.body;
    console.log(req.body);
    const user = await userService.updateUser(userId, { username, email });
    res.status(201).json(user);
  }
  catch(err)
  {
    console.log("error updating user");
    throw err;
  }
}

const deleteUser = async (req, res) =>
{
  try
  {
    const {userId} = req.params
    const user = await userService.deleteUser(userId);
    res.status(201).json(user);
  }
  catch(err)
  {
    console.log("error deleting user");
    throw err;
  }
}
export  {createUser, getAllUsers, getUserById, updateUser, deleteUser,renderUpdate};