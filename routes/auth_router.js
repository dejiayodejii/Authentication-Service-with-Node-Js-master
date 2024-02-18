const Auth = require('../controller/authController');

const authRouter = require('express').Router();

authRouter.get('/', (req,res)=>{
    return res.status(200).json({ message: "User with same email already exists!" });
});

authRouter.post('/api/auth/register', Auth.signUp);
authRouter.post('/api/auth/login', Auth.login);
authRouter.post('/api/auth/forgot-password', Auth.forgotPassword);
authRouter.post('/api/auth/verify-account', Auth.verifyAccount);
authRouter.post('/api/auth/reset-password', Auth.resetPassword);


module.exports = authRouter;