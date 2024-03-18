import { Router } from 'express';
import PostController from '../controllers/postController.js';
import { createPostValidator } from '../middlewares/validator.js';
const router =  Router();

router.get('/create', (req, res) => {
    res.render('createPost'); // Render the createPost.ejs view
});
router.post('/create',createPostValidator, PostController.createPost);
// router.get('/', PostController.getAllPostsWithAssociations);
// router.get('/:postId', PostController.getPostByIdWithAssociations);
// router.put('/:postId', PostController.updatePostById);
// router.delete('/:postId', PostController.deletePostById);
// router.post('/:postId/categories', PostController.createCategoryForPost);
// router.get('/:postId/categories', PostController.getCategoriesForPost);
// router.post('/:postId/comments', PostController.createCommentForPost);
// router.get('/:postId/comments', PostController.getCommentsForPost);

export default router;