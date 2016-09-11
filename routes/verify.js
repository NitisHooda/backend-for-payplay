var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function(tokenData){
    return jwt.sign(tokenData, config.secretKey, {
            expiresIn : 3600     
        });
}

exports.verifyOrdinaryUser = function(req, res, next){
    var AuthHeader = req.body.token || req.query.token || req.headers.authorization;
    console.log(AuthHeader);
    if (AuthHeader) {
        var splitHeader = AuthHeader.split(' ');
        var token = splitHeader[1];
        if (token==null) {
            token = req.body.token;
        }
        var decode = jwt.decode(token, {complete:true});
        //console.log(decode);
        jwt.verify(token, config.secretKey, function(err, decoded){
            if (err) {
                //console.log(err);
                //console.log(err.status);
                var error = new Error('You are not authenticated!');
                res.status(401).json(
                         {
                            error:error
                        });
            }
            else{
                //console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });
    }
    else{
        var err = new Error("No token provided");
        console.log(err);
        res.status(403).json({
                    error : err
                });
    }
}