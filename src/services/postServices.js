import db from '../models/Index.js';

 const getAllPosts = async () => {
  try {
    const posts = await await db.Post.findAll({
        include: [
          { model: db.Comment },
          { model: db.User },
          { model: db.Category }
        ]
      });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

 const getPostById = async (postId) => {
  try {
    const post = await db.Post.findByPk(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw new Error('Failed to fetch post by ID');
  }
};

 const createPost = async (postData) => {
  try {
    const post = await db.Post.create(postData);
    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};

 const updatePost = async (postId, updatedData) => {
  try {
    const post = await db.Post.findByPk(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    await post.update(updatedData);
    return post;
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }
};

 const deletePost = async (postId) => {
  try {
    const post = await db.Post.findByPk(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    await post.destroy();
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};

const createCategoryForPost = async (postId, categoryName) => 
{
    console.log(categoryName)
    try
    {
        const post = await db.Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        const category = await db.Category.create({
            name: categoryName
        });
        await post.addCategory(category);
        return category;
    }
    catch(error)
    {
        console.error('Error creating categ:', error);
        throw new Error('Failed to create categ');
    }
}
 const postService ={ getAllPosts, getPostById, createPost, deletePost, updatePost, createCategoryForPost};

 export default postService;