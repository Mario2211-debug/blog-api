import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    crated_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

})

export default mongoose.model('Post', postSchema)
