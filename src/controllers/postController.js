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
  }




const renderUpdate = async (req, res) => {
    try
    {
        const {postId} = req.params;
        const post = await postService.getPostById(postId);
        res.render('updatePost', {post});
    }
    catch(err)
    {
        console.log('Error updating post');
        throw err;
    }
}

const updatePostById = async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    try{
        const {postId} = req.params;
        const {title, content} = req.body;
        const post = await postService.updatePost(postId, {title, content});
        res.status(201).json(post);
    }
    catch(err)
    {
        console.log('Error updating post');
        throw err;
    }
}

const createCategory = async (req, res)=>
{
    const { postId } = req.params;
    const {categoryName} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    
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
const getCategoriesForPost = async (req, res) =>
{
    const {postId} = req.params
        try
        {
            const categories = await postService.getAllCategoriesForPost(postId);
            res.render('categoryList', {categories});
        }
        catch(err)
        {
            console.error('Error fetching categories:', err);
            res.status(500).send('An error occurred while fetching categories.');
        }
    
}
const createComment = async (req, res)=>
{
    const { postId } = req.params;
    const {userId, content} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    console.log("Comment "+content);
    try
    {
        let comment = await postService.createCommentForPost(postId, userId, content);
        res.status(201).json({success: comment});
    }
    catch(err)
    {
        console.log('Error creating comment');
        throw err;
    }
}
const getAllCommentsForPost = async (req, res) =>
{
    const {postId} = req.params
        try
        {
            const comments = await postService.getAllCommentsForPost(postId);
            res.render('commentsList', {comments});
        }
        catch(err)
        {
            console.error('Error fetching Comments:', err);
            res.status(500).send('An error occurred while fetching comments.');
        }
    
}
export default {createPost,getAllPosts,createCategory,updatePostById, renderUpdate, createComment, getCategoriesForPost, getAllCommentsForPost};