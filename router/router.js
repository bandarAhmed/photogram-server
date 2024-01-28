const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController')
const likeController = require('../controllers/likeController')
const isLogedIn = require('../middlewares/auth')
const { userValidatResult, validate, PostValidatResult} = require('../middlewares/validator');
const storage= require('../middlewares/upload')

// craete and join in the app
router.post('/register', storage.single('avatar'), userValidatResult(),validate, userController.register);
router.post('/login', userController.login);
router.post('/post', isLogedIn, storage.single('img'), PostValidatResult(), validate, postController.newPost);

// post post image
router.post('/post/img',isLogedIn, postController.newPostImg)

// get all post 
router.get('/get-all-post', postController.getAllPost);
// get all user post
router.get('/get-my-post',isLogedIn, userController.getUserPost);

// update post and profile
router.put('/post/:postId/update', isLogedIn,PostValidatResult(), validate, postController.updateMyPost);
router.put('/account/update', isLogedIn, userController.updatePorfile);

// make like to the post and delete it
router.post('/post/:postId/like', isLogedIn, likeController.UserLike);
// conut the likes at the post from all users

module.exports = router;