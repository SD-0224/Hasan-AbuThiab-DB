import db from '../models/Index.js';
import { validationResult } from 'express-validator';

const createPost = async (req, res)=>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    try{
        const {title, content, userId} = req.body;
        const post = await db.Post.create(
            {
                title,
                content,
                userId
            }
        );
        
        res.status(201).json(post);

    }
    catch(err){
        console.log('Error creating post');
        throw err;
    }
}

export default {createPost};