import { Router } from 'express';
import PostController from '../controllers/postController.js';
import { createPostValidator } from '../middlewares/validator.js';
const router =  Router();

router.get('/create', (req, res) => {
    res.render('createPost'); // Render the createPost.ejs view
});
router.post('/create',createPostValidator, PostController.createPost);
router.get('/', PostController.getAllPosts);


// router.get('/:postId', PostController.getPostById);
// router.put('/:postId', PostController.updatePostById);
// router.delete('/:postId', PostController.deletePostById);
router.get('/:postId/createCategory', (req, res) => {
    const postId = req.params.postId;

    res.render('createCategory',{postId}); // Render the createPost.ejs view
});
router.post('/:postId/createCategory', PostController.createCategory);
// router.get('/:postId/categories', PostController.getCategoriesForPost);
// router.post('/:postId/comments', PostController.createCommentForPost);
// router.get('/:postId/comments', PostController.getCommentsForPost);

export default router;