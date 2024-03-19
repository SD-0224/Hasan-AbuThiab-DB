import db from '../models/Index.js';
import { validationResult } from 'express-validator';
import postService from '../services/postServices.js'
const createPost = async (req, res)=>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    try{
        const {title, content, userId} = req.body;
        const post = await postService.createPost(  {
            title,
            content,
            userId
        })
        
        res.status(201).json(post);

    }
    catch(err){
        console.log('Error creating post');
        throw err;
    }
}
 const getAllPosts = async (req, res) => {
    try {
      const posts = await postService.getAllPosts();
  
      res.render('index', { posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('An error occurred while fetching posts.');
    }
  };

const createCategory = async (req, res)=>
{
    const { postId } = req.params;
    const {categoryName} = req.body;
    console.log(categoryName);
    try
    {
        let category = await postService.createCategoryForPost(postId, categoryName);
        res.status(201).json({success: category});
    }
    catch(err)
    {
        console.log('Error creating category');
        throw err;
    }
}
export default {createPost,getAllPosts,createCategory};