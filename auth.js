const jwt = require('jsonwebtoken');
const User = require('./models/users');
module.exports.checkUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader){
        let errors = new Error('Bearer token is not set!!');
        errors.status = 401;
        return next(errors);        
    }
    let token = authHeader.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token,process.env.SECRET);
    }catch (err) {
        throw new Error('Token cannot be verified!!');
    }
    User.findById(data._id)
    .then((user) => {
        req.user = user;
        next();
    });
};