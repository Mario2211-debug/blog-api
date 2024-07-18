import express from 'express';

import { getPosts, getPostByID, createPost, updatePost, deletePost } from '../controllers/blog.js'

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostByID);
router.post('/new', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost)

export default router;