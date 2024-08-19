const express = require('express');
const { 
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} = require('../controllers/userControllers');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddlewares');
const userRouter = express.Router();

userRouter.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
userRouter.post('/auth', loginUser);
userRouter.post("/logout", logoutCurrentUser);
userRouter.route("/profile")
.get(authenticate, getCurrentUserProfile)
.put(authenticate, updateCurrentUserProfile);
userRouter.route('/:id')
        .delete(authenticate, authorizeAdmin, deleteUserById)
        .get(authenticate, authorizeAdmin, getUserById)
        .put(authenticate, authorizeAdmin, updateUserById)

module.exports = userRouter;