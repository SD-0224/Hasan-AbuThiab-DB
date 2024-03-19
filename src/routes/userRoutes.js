import { Router } from 'express';
const router = Router();
import  {createUser, getAllUsers, getUserById, renderUpdate, updateUser, deleteUser}  from '../controllers/userController.js';
import { createUserValidator } from '../middlewares/validator.js';

router.get('/create', (req, res) => {
    res.render('createUser');
  });


router.post('/create',createUserValidator, createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/update/:userId',renderUpdate );
router.put('/:userId',createUserValidator, updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;
