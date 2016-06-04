var express = require('express')
var bodyParser = require('body-parser')

var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');
var Verify = require('./verify');

var router = express.Router();

router.route('/')

.get( function(req, res, next){
    var Auth = req.body.token || req.query.token || req.headers.authorization;
    //console.log(req.headers);
    if (Auth) {
        var splitHeader = Auth.split(' ');
        var token = splitHeader[1];
        //console.log(token);
        var decoded = jwt.decode(token,{complete:true});
        //console.log(decoded.payload);
        //console.log(decoded);
        jwt.verify(token, config.secretKey, function(err, decoded){
        if (err) {
            console.log(err);
            return res.status(401).json({
                success: false,
                message : 'Invalid token'
                });
        }
        else{
            //req.decode = decoded;*/
            //console.log(req.decoded._doc);
            User.findOne({username : decoded._doc.username },function(err, user){
            if (err) {
                throw err;
            }
            else{
                //console.log(req.decoded._doc);
                res.status(200).json(user.transactions);
            }
        });
       }
    })
        
    }
    else{
        return res.status(403).json({
            success : false,
            message : 'No token provided'
        })
    }
    
})

module.exports = router;