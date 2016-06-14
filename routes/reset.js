var express = require('express');
var assert = require('assert');
var bodyParser = require('body-parser');
var passport = require('passport');
var async = require('async');

var Users = require('../models/user');
var router = express.Router();
router.use(bodyParser.json());

router.route('/')

router.get('/:token', function(req, res, next){
        console.log(req.params.token);
    Users.findOne({resetPasswordToken : req.params.token, resetPasswordExpires : { $gt : Date.now()}}, function(err, user){
        if (!user) {
             res.status(400).json("User does not exist!");   
            //console.log('BAD');
        }
        console.log(user);
        //res.send('Hello World');
        res.render('resetPassword', {
            user : req.user
        });
    });
})

router.post('/:token', function(req, res, next){
       async.waterfall([        
                function (done) {
                        if (req.body.password == req.body.confirm) {
                                Users.findOne({resetPasswordToken : req.params.token, resetPasswordExpires : { $gt : Date.now()}},function(err,user){
                                        if(!user){
                                               //console.log('BAD00');
                                               res.status(400).json("User does not exist!");
                                        }
                                        user.setPassword(req.body.password, function(){
                                                user.save();
                                                res.status(200).json("Password changed succesfully");
                                                console.log('Done');
                                        });
                                        user.resetPasswordToken = undefined;
                                        user.resetPasswordExpires = undefined;
                                        console.log(req.body);
                                });
                        }
                        else{
                               // res.status(400).json("Password don't match");
                                res.render('resetPassword',{alert: "Password doesn't match"});
                        }
                }
        ]) 
});

module.exports = router;