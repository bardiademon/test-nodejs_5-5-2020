import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    'account': {
        type: mongoose.Types.ObjectId
    },
    'title': {
        type: String,
        required: true
    },
    'body': {
        type: String,
        required: true
    },
    'date': {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('posts', PostSchema);
