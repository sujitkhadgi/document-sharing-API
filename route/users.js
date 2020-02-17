const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth');
const User = require('../models/users');
const router = express.Router();

router.post('/register',(req,res,next) => {
    let password = req.body.password;
    bcrypt.hash(password,10,function(error, hash){
        if(error) {
            let error = new Error('Password couldnot hast');
            error.status = 501;
            console.log(error);
            
            return next(error);
        
        }
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            user_id: req.body.user_id,
            password: hash,
            type: req.body.type,
            image:req.body.image
        })
        .then((user) => {
            let token = jwt.sign({_id: user._id}, process.env.SECRET);
            res.status(201);
            res.json({status: "Register successfully!!", token: token});
        })
        .catch(next);
    })
})

router.post('/login', (req, res, next) => {
    User.findOne({user_id: req.body.user_id})
    .then((user) => {
        console.log(user.user_id);
        if (user == null) {
            let error = new Error('Email not found');
            error.status = 404;
            return next(error);
        }
        else{
            bcrypt.compare(req.body.password, user.password)
            .then((isMatch) => {

                console.log(req.body.password);
                console.log(user.password);
                console.log(isMatch);
                
                if(!isMatch) {
                console.log(isMatch);
                    let error = new Error('Sorry, password does not match!!');
                    error.status = 409;
                    return next(error);
                }
                    let token = jwt.sign({_id: user._id}, process.env.SECRET);
                    res.json({status: 'Login success', token: token,type: user.type});
                   
                        
                
                
            })
            .catch(next);
        }
    })
    .catch(next);
})

router.get('/me', auth.checkUser, (req, res, next) => {
    res.json({
        _id: req._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        user_id: req.user.user_id,
        password:req.user.password,
        type: req.user.type,
        image: req.user.image



    });
});

module.exports = router;