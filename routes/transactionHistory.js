var express = require('express')
var bodyParser = require('body-parser')

var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');
var Verify = require('./verify');

var router = express.Router();

router.route('/')

.get( Verify.verifyOrdinaryUser, function(req, res, next){
            //req.decode = decoded;*/
            //console.log(req);
            User.findOne({username : req.decoded.username },function(err, user){
            if (err) {
                 throw err;
            }
            else{
                if (!user) {
                   res.status(400).json("User not found");
                }
                else{
                        res.status(200).json(user.transactions);
                }
            }
        });   
})

.post(function(req,res){
    var err = new Error("Bad Request");
    err.status =  400;
    throw err;
})
module.exports = router;