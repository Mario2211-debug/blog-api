import express from 'express';
import { createPost, updatePost, getPosts, getPostByID, deletePost } from '../controllers/blog.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the routes and use the `upload` middleware for the createPost route
router.post('/new', upload.single('file'), createPost);
router.put('/:id', updatePost);
router.get('/', getPosts);
router.get('/:id', getPostByID);
router.delete('/:id', deletePost);

export default router;
