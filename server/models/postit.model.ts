import mongoose from 'mongoose';

const PostitSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: true },
    description: { type: String, unique: false, required: true }
});

const Postit = mongoose.model('Postit', PostitSchema);
export default Postit;