const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');

const authenticateToken = (req,res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    if(!token) {
        return res.status(401).json({error: 'Access denied'});
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    }  catch (err) {
        console.error(err);
        res.status(400).json({error: 'Invalid token'});
    }
};

module.exports = authenticateToken;