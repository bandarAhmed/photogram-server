const models = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();


exports.register = async (req ,res)=>{

    const takeProto =  req.protocol + "://" + req.get('host')
    const {name, email, password } = req.body;

    //hasing password saving in database
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const regUser = await models.User.create({
            name,
            email,
            avatar:  takeProto  + '/public/images/' + req.file.filename,
            password: hashPassword
        });
        res.status(200).json({message:'Create Email Secssesfully'});
    } catch (e) {   
        console.error(e);
        res.status(401).json({message: "something rong habend"})
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await models.User.findOne({email});
        // compare the password from register to real password using bcrypt module
        const authPassword = await bcrypt.compare(password, user.password);
        // if authPassword is true sgin data useing JWt module and print it in json body
        if (authPassword) {
            const token = jwt.sign({_id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET);
            // here we take token to save it in loaclStorg 
            res.status(200).json({accessToken: token});
        }else {
            res.status(401).json({ message: "بريد إلكتروني أو كلمة مرور غير صالحة" });
        };

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};


exports.updatePorfile = async (req, res) => {
    const { name, password } = req.body;
    const _id = req.currentUser
    try {   
            const hashPassword = await bcrypt.hash(password, 10);
            const userUpdate = await models.User.updateOne({_id},{ name, password: hashPassword })
            if(userUpdate){
                res.status(200).json({message: 'You Update your profile'});
            }else{
                res.status(404).json({message: "Cant update"})
            }
    } catch (e) {
        res.status(500).json(e);
    }
};

exports.getUserPost = async (req, res) => {
    const author = req.currentUser
    try {
        const user = await models.Post.find({author}).populate({ path: 'author', select: 'name avatar'})
        console.log(author)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({date: user});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};