import express from 'express';
import { createPost, updatePost, getPosts, getPostByID, deletePost } from '../controllers/post.js';
import { getCategory, creatCategory, getCategoryById } from '../controllers/category.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the routes and use the `upload` middleware for the createPost route
router.post('/new', upload.single('file'), createPost);
router.put('/post/:id', updatePost);
router.get('/', getPosts);
router.get('/post/:id', getPostByID);
router.delete('/post/:id', deletePost);

//route for category
router.post('/category', creatCategory)
router.get('/categories', getCategory)
router.get('/categorie/:id', getCategoryById)



export default router;
