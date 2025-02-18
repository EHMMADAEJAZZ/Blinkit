import express from 'express';

const router = express.Router();
//import controlers
import { changePassword, forgetPassword, getMe, login, logout, refreshAccessToken, registerUser, resetPassword, verifyEmail } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middlewares/protected.middleware.js';
import { updateUser, uploadAvatar } from '../controllers/user.controller.js';
import upload from '../controllers/multer.middleware.js';

// register route
router.post('/register', registerUser);
router.post('/verify-email',verifyEmail)
router.post('/login', login)
router.post('/logout',protectedRoute, logout);
router.post('/change-password',protectedRoute,changePassword)
router.post('/forgot-password',forgetPassword)
router.post('/reset-password',resetPassword)
router.put('/upload-avatar',protectedRoute,upload.single('avatar') ,uploadAvatar)
router.put('/update-user',protectedRoute,updateUser);
router.post('/refresh-accesstoken',protectedRoute,refreshAccessToken);
router.get('/get-me', protectedRoute,getMe)
router.get("/users",protectedRoute,(req,res)=>{
    res.json({message:"You are authenticated"})
})
export default router;
