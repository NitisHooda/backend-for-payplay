var express = require('express')
var bodyParser = require('body-parser')
var passport = require('passport')

var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
.get(function(req, res){
    var err = new Error("Bad Request");
    err.status = 400;
    throw err;
})

.post(function(req, res, next){
    console.log(req.body);
    User.findOne({username : req.body.email}).exec(function(err, user){
        if (err) {
            throw err;
        }
        else{
            console.log(user);
            user.transactions.push({
                txnid : req.body.txnid,
                amount : req.body.amount,
                productInfo : req.body.productinfo,
                status : req.body.status,
                Date : req.body.addedon,
                PayuTransactionId : req.body.mihpayid
            });
            user.save(function(err, transction){
                console.log(transction);
            });
        }
        res.writeHead(302, {'Location' : 'test://'});
    
    res.end();
        
    });
    
    
    
})

module.exports = router;