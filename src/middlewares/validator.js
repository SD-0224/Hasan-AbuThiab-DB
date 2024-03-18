import { body } from 'express-validator';
import db from "../models/Index.js";

export const createPostValidator = [
  body('title').notEmpty().isString(),
  body('content').notEmpty().isString(),
  body('userId').custom(async (value, { req }) => {
    // Check if the userId exists in the database
    const user = await db.User.findByPk(value);
    if (!user) {
      throw new Error('User ID does not exist');
    }
    return true; }),
];

export const createUserValidator = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('email').isEmail().withMessage('Invalid email address').custom(async (value, { req }) => {
    // Check if the email already exists in the database
    const existingUser = await db.User.findOne({ where: { email: value } });
    if (existingUser) {
      throw new Error('Email already exists');
    }
  }),
];
