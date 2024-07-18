import Post from '../models/Post.js'
import asyncHandler from 'express-async-handler';

// Função para validar os dados do corpo da requisição
const validatePostData = (data) => {
    const { title, content } = data;
    if (!title || !content) {
        throw new Error('Title and content are required');
    }
};


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

export const getPostByID = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
    try {
        validatePostData(req.body);
        const post = new Post(req.body);
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
});

export const updatePost = async (req, res) => {
    try {
        const posts = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(posts);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.json({ message: 'Post apagado ' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};