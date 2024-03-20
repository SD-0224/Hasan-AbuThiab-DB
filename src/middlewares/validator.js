import { body, param } from "express-validator";
import db from "../models/Index.js";

export const createPostValidator = [
  body("title").notEmpty().isString().withMessage("Title is required'"),
  body("content").notEmpty().isString().withMessage("Content is required"),
  body("userId").custom(async (value, { req }) => {
    // Check if the userId exists in the database
    const user = await db.User.findByPk(value);
    if (!user) {
      throw new Error("User ID does not exist");
    }
    return true;
  }),
];

export const createUserValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value, { req }) => {
      // Check if the email already exists in the database
      const existingUser = await db.User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error("Email already exists");
      }
    }),
];
export const createCategoryValidator = [
  // Validate category name
  param("postId")
    .isInt()
    .withMessage("Invalid post ID")
    .custom(async (value, { req }) => {
      const post = await db.Post.findByPk(value);
      if (!post) {
        throw new Error("Post does not exist");
      }
    }),
  body("categoryName").notEmpty().withMessage("Category name is required"),
];

export const createCommentValidator = [
  param("postId")
    .isInt()
    .withMessage("Invalid post ID")
    .custom(async (value, { req }) => {
      const post = await db.Post.findByPk(value);
      if (!post) {
        throw new Error("Post does not exist");
      }
    }),
  body("content").notEmpty().withMessage("Comment content is required"),
  body("userId")
    .notEmpty()
    .isInt()
    .withMessage("Invalid user ID")
    .custom(async (value, { req }) => {
      const user = await db.User.findByPk(value);
      if (!user) {
        throw new Error("User does not exist");
      }
    }),
];
