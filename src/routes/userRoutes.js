import { Router } from 'express';
const router = Router();
import  createUser  from '../controllers/userController.js';
import { createUserValidator } from '../middlewares/validator.js';

router.get('/create', (req, res) => {
    res.render('createUser');
  });

router.post('/create',createUserValidator, createUser);
// router.get('/', getAllUsers);
// router.get('/:userId', getUserById);
// router.put('/:userId', updateUserById);
// router.delete('/:userId', deleteUserById);

export default router;
