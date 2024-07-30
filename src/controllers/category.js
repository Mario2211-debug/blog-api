import axios from "axios";
import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";




export const creatCategory = asyncHandler(async (req, res) => {
    try {
        const category = new Category(req.body)
        const newCat = await category.save();
        res.status(201).send(newCat)
    } catch (error) {
        res.status(400).send(error)
    }
})

export const getCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find()
        res.json(category)
        console.log("Solicitando o GET")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }
        res.json(category);
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).json({ message: 'Erro ao buscar categoria' });
    }
})