const Auth = require('../controller/authController');
const verifyToken = require('../middleware/auth_middleware').verifyToken;

const authRouter = require('express').Router();


authRouter.post('/api/auth/register', Auth.signUp);
authRouter.post('/api/auth/login', Auth.login);
authRouter.post('/api/auth/forgot-password', Auth.forgotPassword);
authRouter.post('/api/auth/verify-account', Auth.verifyAccount);
authRouter.post('/api/auth/reset-password', Auth.resetPassword);
authRouter.post('/api/auth/change-password', verifyToken, Auth.changePassword);


module.exports = authRouter;