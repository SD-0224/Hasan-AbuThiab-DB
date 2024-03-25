import db from "../models/Index.js";
const getAllUsers = async () => {
  try {
    const users = await await db.User.findAll();
    return users;
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw new Error("Failed to fetch Users");
  }
};

const getUserById = async (userId) => {
  try {
    const user = await db.User.findByPk(userId, {
      include: [
        {
          model: db.Post,
          include: [db.Comment],
        },
      ],
    });
    if (!user) {
      throw new Error("User ID does not exist");
    }
    console.log(user);
    return user;
  } catch (error) {
    console.error("error getting the user:", error);
    throw new Error("error getting the user");
  }
};

const createUser = async (userData) => {
  try {
    const user = await db.User.create(userData);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

const updateUser = async (userId, updatedData) => {
  try {
    const user = await db.User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    console.log(updatedData);
    await user.update(updatedData, { fields: ["username", "email"] });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await db.User.findByPk(userId);
    if (!user) {
      throw new Error("user not found");
    }
    await user.destroy();
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};

const getUserbyName = async (username) => {
  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("error getting the user:", error);
    throw new Error("error getting the user");
  }
};
const userService = {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  getUserbyName,
};

export default userService;
