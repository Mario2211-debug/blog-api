import mongoose from 'mongoose';
import express from 'express'
import { MONGO_URI, PORT } from './config.js'
import blogRoutes from './routes/blog.js';
import cors from 'cors'
//const express = require('express');
//const MONGO_URI = require('./config')
//const PORT = require('./config')
//const blogRoutes = require('./routes/blog.js')





const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect(MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.error(err))

app.use('/api/blog', blogRoutes)
app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`)
})