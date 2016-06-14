var express = require('express');
var bodyParser = require('body-parser');
var assert = require('assert');
var passport = require('passport');
var Verify = require('./verify');

var Users = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

/* authenticate user */
router.route('/')

.post(function(req, res, next){
    console.log(req.headers);
    passport.authenticate('local', function(err, user, info){
        if(err){
            next(err);    
        }
        if (!user) {
            console.log(user);
            return res.status(401).json({
                err : info   
            });
        }
        req.logIn(user, function(err){
            if(err){
                console.log(err);
                    return res.status(500).json({
                        err : 'Could not login user'
                        });
                }
            
            var tokenData = {
                username : user.username,
                firstname : user.firstname,
                email : user.email,
                phoneNumber : user.phoneNumber
            }
        
            var token = Verify.getToken(tokenData);
            res.status(200).json({
                status : 'Successfully Loggedin',
                success : true,
                token : token,
                username : user.username, 
                email : user.email,
                phoneNumber : user.phoneNumber,
                firstname : user.firstname,
                lastname: user.lastname
            });
            console.log(user.username);
         });
    })(req, res, next);
   
});
router.get('/logout', function(req, res){
   // console.log(req.headers);
    req.logout();
    res.status(200).json({status : 'Bye'});
});

module.exports = router;