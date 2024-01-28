const models = require('../models/index');


exports.UserLike = async(req , res)=> {
    const {like} = req.body;
    const _id = req.currentUser;
    const postId = req.params;
    try {
        const userFind = await models.Like.find().populate({path: 'author', select: "_id"})
        res.status(200).json({message: "LIke add it seeccesfuly"});
        if(userFind){
            const disLike = await models.Like.removeListener({postId})
            res.status(200).json({message: 'like removed'})
        }else{
            const likepost = await models.Like.create(_id ,postId, {like})
            res.status(200).json({message: 'like add it'})
        }

    } catch (e) {
        res.status(500).json(e)
    }
}