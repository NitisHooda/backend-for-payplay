var express = require('express')
var bodyParser = require('body-parser')
var passport = require('passport')

var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
.post(function(req, res, next){
    console.log("Done");
    User.findOne({username : 'asd'}).exec(function(err, user){
        if (err) {
            throw err;
        }
        else{
            console.log(user);
            user.transactions.push({
                txnid : req.body.txnid,
                amount : req.body.amount,
                productInfo : req.body.productinfo,
                status : req.body.status
            });
        };
        user.save(function(err, transction){
            console.log(transction);
        });
    });
    
    
    res.writeHead(302, {'Location' : 'http://localhost:8100/#/app/home'});
    
    res.end();
})

module.exports = router;