const mongoose = require('mongoose');
const models = require('../models/index');
const fs = require('fs')

exports.newPost = async (req, res) => {
    const httpHost = req.protocol + "://" + req.get('host');
    const { title, discraption, like } = req.body;
    const _id = req.currentUser
    try {
        const newPost = await models.Post.create({
            img: httpHost + '/public/images/' + req.file.filename,
            title,
            discraption,
            like,
            author: _id,
            });
        res.status(200).json({ message: 'post add seecss' })
    } catch (e) {
        res.status(500).json(e)
    }
};

exports.newPostImg  = async (req, res)=> {
    
    const {img} = req.body
    const _id = req.currentUser;
    try {
        const postImg = await models.Post.create({
           
            author: _id,
        });
        fs.readdirSync(postImg)
        res.status(200).json({ message: "add-seecssfuly" })
    } catch (e) {
        res.status(404).json({message: "Imgae Error" })
    }
 }

exports.updateMyPost = async (req, res) => {
    const { img, title, discraption,like } = req.body;
    const _id = req.params.postId;
    try {
        await models.Post.updateOne(
            { _id },
            { img, title, discraption, like}
        );
        res.status(200).json({ message: 'updated' })
    } catch (e) {
        res.status(500).json(e)
    }
};

exports.getAllPost = async (req, res) => {
    try {
        const user = await models.Post.find().populate({ path: 'author', select: 'name avatar'})
        res.status(200).json({date: user})
    } catch (e) {
        res.status(401).json(e)
    }
};


