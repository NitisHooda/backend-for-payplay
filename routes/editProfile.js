var express = require('express');
var bodyParser = require('body-parser');
var assert = require('assert');
var passport = require('passport');
var Verify = require('./verify');

var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

/* authenticate user */
router.route('/')

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    console.log(req.decoded.username);
    User.findOne({username : req.decoded.username }).exec(function(err, user){
            if (err) {
                 throw err;
            }
            else{
                if (!user) {
                   res.status(400).json("User not found");
                }
                else{
                console.log(user);
                    //res.status(200).json(user.transactions);
                    user.firstname = req.body.firstname;
                    user.lastname = req.body.lastname;
                    user.email = req.body.email;
                    user.phoneNumber = req.body.phoneNumber;
                    user.save(function(err, user){
                        console.log(user.phoneNumber);
                       res.status(200).json({
                            firstname : user.firstname,
                            lastname : user.lastname,
                            email : user.email,
                            phoneNumber : user.phoneNumber
                        }); 
                    });
                }
            }
        });  
})

module.exports = router;