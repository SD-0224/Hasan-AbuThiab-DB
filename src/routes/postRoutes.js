import { Router } from "express";
import PostController from "../controllers/postController.js";
import {
  createPostValidator,
  createCommentValidator,
  createCategoryValidator,
} from "../middlewares/validator.js";
const router = Router();

router.get("/create", (req, res) => {
  res.render("createPost"); 
});
router.post("/create", createPostValidator, PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/:postId", PostController.getPostbyId);
router.get("/update/:postId", PostController.renderUpdate);
router.put(
  "/update/:postId",
  createPostValidator,
  PostController.updatePostById
);
router.delete("/delete/:postId", PostController.deletePost);
router.get("/:postId/createCategory", (req, res) => {
  const postId = req.params.postId;
  res.render("createCategory", { postId }); 
});
router.post(
  "/:postId/createCategory",
  createCategoryValidator,
  PostController.createCategory
);
router.get("/:postId/categories", PostController.getCategoriesForPost);
router.get("/:postId/createComments", (req, res) => {
  const postId = req.params.postId;
  res.render("postComments", { postId }); 
});
router.post(
  "/:postId/createComments",
  createCommentValidator,
  PostController.createComment
);
router.get("/:postId/comments", PostController.getAllCommentsForPost);
export default router;
