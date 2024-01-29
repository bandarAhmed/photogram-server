const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController')
const likeController = require('../controllers/likeController')
const isLogedIn = require('../middlewares/auth')
const { userValidatResult, validate, PostValidatResult, UpdateuserValidatResult} = require('../middlewares/validator');
const storage = require('../middlewares/upload')

// craete and join in the app
router.post('/register', storage.single('img'), userValidatResult(),validate, userController.register);

// login in if  user have  account
router.post('/login', userController.login);

// create post
router.post('/post', isLogedIn, storage.single('img'), PostValidatResult(), validate, postController.newPost);



// get all post 
router.get('/get-all-post', postController.getAllPost);
// get all user post
router.get('/get-my-post',isLogedIn, userController.getUserPost);

// update post and profile
router.put('/post/:postId/update', isLogedIn, storage.single('upimg'), postController.updateMyPost);

// update user name and password
router.put('/account/update', isLogedIn, UpdateuserValidatResult(), validate, userController.updatePorfile);

//update auserAvatr useing multer js 
router.put('/account/update/avatar', isLogedIn, storage.single('upavatr'), userController.updatauserAvatar);

// delete post
router.delete('/post/:postId/delete', isLogedIn, postController.deleteMyPostg);

// make like to the post and delete it
router.post('/post/:postId/like', isLogedIn, likeController.UserLike);

module.exports = router;