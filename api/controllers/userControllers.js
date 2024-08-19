const { asyncHandler } = require("../middlewares/asyncHandler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createToken = require('../utils/createToken');

exports.createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        throw new Error('Please fill all the inputs');
    }

    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).send('User already exists');
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password: hashedPassword                                 });

    try {
        await newUser.save();
        createToken(res, newUser._id);
        res.status(201).json({
            _id: newUser.id, 
            username: newUser.username, 
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        })
    } catch (error) {
        res.status(400)
        throw new Error('Invalid user data');
    }
});

exports.loginUser = asyncHandler(async(req,res) => {
    const{email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(isPasswordValid){
            createToken(res, existingUser._id);

            res.status(201).json({
                _id:existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });
            return;
        }
    }
})


exports.logoutCurrentUser= asyncHandler(async(req, res)=>{
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({message: "Logged out successfully"});
})

exports.getAllUsers = async(req, res) =>{
   const users = await User.find({});
   res.json(users);
}

exports.getCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }else{
        res.status(404);
        throw new Error('User not found.');
    }
});

exports.updateCurrentUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

exports.deleteUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.param.id);

    if(user){
       if(user.isAdmin){
         res.status(400);
         throw new Error('Cannot delete admin user');
       }

       await User.deleteOne({_id: user._id});
       res.json({message: "User removed"});
    }else{
       res.status(404);
       throw new Error('User not found');
    }
});

exports.getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if(user){
        res.json(user);
    }else{
        throw new Error('User not found');
    }
});

exports.updateUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updateUser.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
})