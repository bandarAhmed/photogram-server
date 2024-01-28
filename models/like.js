const mongoose = require('mongoose');
const { Schema } = mongoose;

const Like = new Schema({
    like: Boolean,
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }
},
{
    timestamps: false,
    versionKey: false
});

const like = mongoose.model("Like", Like);
module.exports = like;