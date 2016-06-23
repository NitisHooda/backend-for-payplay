var express =  require('express');
var bodyParser = require('body-parser');
var assert = require('assert');
var passport = require('passport');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var async = require('async');
var bcrypt = require('bcrypt-nodejs');

var Users = require('../models/user');
var router = express.Router();
router.use(bodyParser.json());

router.route('/')

.get(function(req, res){
    var error = new Error("Bad Request");
    error.status = 400;
    throw error;
})

.post(function(req, res, next){
    console.log(req.body.email);
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf){
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
             Users.findOne({email : req.body.email}, function(err, user){
                if(!user){
                    console.log('User not found');
                    res.status(400).json("Invalid Email!");
                }
                else{
                    console.log(user);
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; //1 hour
                
                    user.save( function(err){
                        done(err, token, user);
                    });
                }
            });  
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service : 'gmail',
                auth : {
                    user : 'nitishkum91@gmail.com',
                    pass : 'nosurity4job#*'
                }
            });
            
            var mailOptions = {
                to : user.email,
                from : 'nitishkum91@gmail.com',
                subject : 'Node.js Password Reset',
                text : 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain '
            };
            smtpTransport.sendMail(mailOptions, function(err){
                console.log(err);
                done(err, 'done');
            });
        }
    ],  function(err){
            if (err) return next(err);
            res.status(200).json();
        });
      
});
module.exports = router;