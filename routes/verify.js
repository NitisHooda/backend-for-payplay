var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, {
            expiresIn : 3600     
        });
}

exports.verifyOrdinaryUser = function(req, res, next){
    var AuthHeader = req.body.token || req.query.token || req.headers.authorization;
    
    if (AuthHeader) {
        var splitHeader = AuthHeader.split(' ');
        var token = splitHeader[1];
        var decode = jwt.decode(token, {complete:true});
        console.log(decode);
        jwt.verify(token, config.secretKey, function(err, decoded){
            if (err) {
                var error = new Error('You are not authenticated!');
                error.status = 401;
                return next(error);
            }
            else{
                console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });
    }
    else{
        var err = new Error("No token provided");
        err.status = 403;
        return next(err);
    }
}