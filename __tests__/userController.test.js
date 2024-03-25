import { createUser, getAllUsers, getUserById, updateUser, deleteUser, renderUpdate } from '../src/controllers/userController.js';
import userService from '../src/services/userServices.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

jest.mock('../src/services/userServices.js', () => ({
  createUser: jest.fn(),
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('createUser', () => {
    it('should return 201 and created user data on successful user creation', async () => {
      const req = { body: { username: 'testuser', email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const newUser = { id: 1, username: 'testuser', email: 'test@example.com' };
      validationResult.mockReturnValueOnce({ isEmpty: () => true });

      userService.createUser.mockResolvedValueOnce(newUser);

      await createUser(req, res);

      expect(validationResult).toHaveBeenCalledWith(req);
      expect(userService.createUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });

    it('should return 400 with validation errors if request body is invalid', async () => {
      const req = { body: { username: '', email: 'invalid-email', password: 'short' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      validationResult.mockReturnValueOnce({ isEmpty: () => false, array: () => [{ msg: 'Invalid email address' }] });

      await createUser(req, res);

      expect(validationResult).toHaveBeenCalledWith(req);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Invalid email address' }] });
    });

  
  });
  describe('getUserById', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return user details when a valid userId is provided', async () => {
      const userId = 1; 
      const tokenPayload = { userId }; 
      const tokenSecret = 'your_secret_key'; 
      const token = jwt.sign(tokenPayload, tokenSecret); 
      
      const req = { params: { userId }, headers: { authorization: `Bearer ${token}` } }; // Mock request object with JWT token
      const res = {
        render: jest.fn(),
      }; 
  
      const user = { id: userId, username: 'testuser', email: 'test@example.com' };
      userService.getUserById.mockResolvedValueOnce(user);
      req.userId = userId;
      await getUserById(req, res);
  
      expect(userService.getUserById).toHaveBeenCalledWith(userId);
      expect(res.render).toHaveBeenCalledWith('userDetails', { user });
    });
  });
});
