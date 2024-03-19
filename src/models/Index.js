import { Sequelize } from "sequelize";
import definePostModel from "./post.js";
import defineCategoryModel from "./category.js";
import defineCommentModel from "./comment.js";
import defineUserModel from "./user.js";
import definePostCategoryModel from "./PostCategory.js";
import dotenv from "dotenv";
dotenv.config();
console.log("DB_DIALECT:", process.env.DB_DATABASE);

const sequelize = new Sequelize(
  process.env.DB_NAME || "week7_project",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "mysql",
  }
);

const User = defineUserModel(sequelize);
const Post = definePostModel(sequelize);
const Category = defineCategoryModel(sequelize);
const Comment = defineCommentModel(sequelize);
const PostCategory = definePostCategoryModel(sequelize);

// Define associations
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });
Post.belongsToMany(Category, { through: PostCategory, foreignKey: "postId" });
Category.belongsToMany(Post, {
  through: PostCategory,
  foreignKey: "categoryId",
});
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

export default { sequelize, User, Post, Category, Comment, PostCategory };
