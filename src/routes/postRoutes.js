import { Router } from "express";
import PostController from "../controllers/postController.js";
import {
  createPostValidator,
  createCommentValidator,
  createCategoryValidator,
} from "../middlewares/validator.js";
import { verifyToken } from "../middlewares/jwtToken.js";
const router = Router();

router.get("/create", verifyToken, (req, res) => {
  res.render("createPost");
});
router.post(
  "/create",
  verifyToken,
  createPostValidator,
  PostController.createPost
);
router.get("/", PostController.getAllPosts);
router.get("/:postId", PostController.getPostbyId);
router.get("/update/:postId", verifyToken, PostController.renderUpdate);
router.put(
  "/update/:postId",
  verifyToken,
  createPostValidator,
  PostController.updatePostById
);
router.delete("/delete/:postId", verifyToken, PostController.deletePost);
router.get("/:postId/createCategory", verifyToken, (req, res) => {
  const postId = req.params.postId;
  res.render("createCategory", { postId });
});
router.post(
  "/:postId/createCategory",
  verifyToken,
  createCategoryValidator,
  PostController.createCategory
);
router.get("/:postId/categories", PostController.getCategoriesForPost);
router.get("/:postId/createComments", verifyToken, (req, res) => {
  const postId = req.params.postId;
  res.render("postComments", { postId });
});
router.post(
  "/:postId/createComments",
  createCommentValidator,
  verifyToken,
  PostController.createComment
);
router.get("/:postId/comments", PostController.getAllCommentsForPost);
export default router;
