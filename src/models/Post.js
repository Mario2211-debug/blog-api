import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    date: { type: Date, default: Date.now },
    crated_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

})
mongoose.set('strictPopulate', false); // Desativa a verificação estrita
export default mongoose.model('Post', postSchema)
