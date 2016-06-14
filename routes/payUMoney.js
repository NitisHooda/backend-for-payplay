var express = require('express')
var bodyParser = require('body-parser');

var sha512 = require('sha512');
var http = require('http');
var request = require('request');

var Verify = require('./verify');

var app = express();

var router = express.Router();
router.use(bodyParser.json());

// POST payment details
router.route('/')



.post(Verify.verifyOrdinaryUser, function(req, res, next){
    var data = req.body ;
    var key = data.merchantKey;
    var salt = data.salt;
    var amount = data.amount;
    var productinfo = data.productinfo;
    var firstname = req.decoded.firstname;
    var email = req.decoded.email;
    var txnid = 'qwerty';
    var hashText = key + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|||||||||||'  + salt ;
    var hashEncode = sha512(hashText);
    var payUParameters = {
        key : key,
        txnid : 'qwerty',
        amount : amount,
        productinfo : productinfo,
        firstname : firstname,
        email : email,
        phone : req.decoded.phoneNumber,
        surl : 'http://ec2-52-40-84-202.us-west-2.compute.amazonaws.com:3000/success',
        furl : 'http://ec2-52-40-84-202.us-west-2.compute.amazonaws.com:3000/failure',
        hash : hashEncode.toString('hex'),
        service_provider : 'payu_paisa'
    };
    request({
       uri : 'https://test.payu.in/_payment',
       method : 'POST',
       form : payUParameters,
    },function(error, response, body){
        var header = response.headers;
        res.writeHead(200,header);
        res.end();
    });
})


module.exports = router;

