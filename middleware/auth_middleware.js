/* eslint-disable no-undef */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthMiddleware = {};



AuthMiddleware.generateToken = async (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_OR_KEY);

}

AuthMiddleware.verifyToken = async (req,res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).json({ mesg: "No authorized token" });

        const verified = jwt.verify(token, process.env.SECRET_OR_KEY);
        if (!verified)
            return res
                .status(401)
                .json({ msg: "Token verification failed, authorization denied." });
        req.id = verified.id;
        req.token = token;
        next();
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }

}

module.exports = AuthMiddleware;