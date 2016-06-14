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
    /*console.log(req.headers);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error("You are not authenticated");
        err.status = 401;
        res.send(err);
        console.log(err);
        return;
    }
    var auth = new Buffer(authHeader.substring(6),'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    console.log(auth);
    Users.findOne({username:user},function(err, result){
            assert.equal(err,null);
            //assert.notEqual(result,null);
            console.log(result);
            console.log(pass);
            //assert.equal(result.password,pass); 
            //sres.send("Successul");
           
            if (result != null) {
                    if (result.password == pass) {
                    res.send(result.username);
                    
                    }
                    else{
                        var error = new Error("Incorrect Password");
                        //error.status = 500;
                        //console.log(error.message);
                        res.writeHead(404, error.message, {'content-Type' : 'text/plain'});
                        res.end(error.message);
                    }
            }       
            
            else{
                        error = new Error("Incorrect Username");
                        res.writeHead(404, error.message, {'content-Type' : 'text/plain'});
                        res.end(error.message);
            }                
                    
        });*/
});
router.get('/logout', function(req, res){
   // console.log(req.headers);
    req.logout();
    res.status(200).json({status : 'Bye'});
});

module.exports = router;