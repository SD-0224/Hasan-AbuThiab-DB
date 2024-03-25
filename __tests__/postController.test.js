import postController from '../src/controllers/postController.js';
import postService from '../src/services/postServices.js';
import { validationResult } from 'express-validator'; 

jest.mock('../src/services/postServices.js');
jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
  }));
describe('createPost', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new post successfully', async () => {
    const req = {
      body: {
        title: 'Test Post',
        content: 'This is a test post content',
        userId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const createdPost = { id: 1, title: 'Test Post', content: 'This is a test post content', userId: 1 };
    postService.createPost.mockResolvedValueOnce(createdPost);
    validationResult.mockReturnValueOnce({
        isEmpty: () => true, 
      });
    await postController.createPost(req, res);

    expect(postService.createPost).toHaveBeenCalledWith({
      title: 'Test Post',
      content: 'This is a test post content',
      userId: 1,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdPost);
  });
  it('should handle errors during post creation and return error response', async () => {
    const req = {
      body: {
        title: '',
        content: 'This is a test post content',
        userId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const validationErrors = [{ msg: 'Title is required' }];
    validationResult.mockReturnValueOnce({ isEmpty: () => false, array: () => validationErrors });

    await postController.createPost(req, res);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, errors: validationErrors });
  });
  
});
