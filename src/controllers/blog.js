import FormData from 'form-data';
import { account_id, api_token } from '../config.js';
import asyncHandler from 'express-async-handler';
import axios from 'axios';
import Post from '../models/Post.js';



// Function to validate the request body data
const validatePostData = (data) => {
    if (!data.title || !data.content || !data.description) {
        throw new Error('Title, content, and description are required');
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
    const file = req.file;
    try {
        validatePostData(req.body);
        let urlImg = '';
        if (file) {
            const form = new FormData();
            form.append('file', file.buffer, { filename: file.originalname });

            const uploadResponse = await axios.post(
                `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1`,
                form,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
                        'Authorization': `Bearer ${api_token}`,
                        ...form.getHeaders(),
                    },
                }
            );
            urlImg = uploadResponse.data.result.variants[0];
        }

        const post = new Post(
            {
                ...req.body,
                imageUrl: urlImg,
            }
        );
        const newPost = await post.save();
        res.status(201).json(newPost);
        console.log(urlImg);
        console.log('Post criado com sucesso:' + res.body + '/n')

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
});

export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
        console.log('Post apagado')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};