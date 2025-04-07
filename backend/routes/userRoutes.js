import express  from 'express';
import { loginStudent, registerStudent, adminLogin,loginServiceProvider, registerServiceProvder } from '../controllers/userController.js';

const userRouter =express.Router();

userRouter.post('/sturegister', registerStudent)
userRouter.post('/stulogin', loginStudent)
userRouter.post('/serregister', registerServiceProvder)
userRouter.post('/serlogin', loginServiceProvider)
userRouter.post('/admin', adminLogin)

export default userRouter;