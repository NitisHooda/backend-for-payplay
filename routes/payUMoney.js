var express = require('express')
var bodyParser = require('body-parser');

var sha512 = require('sha512');
var http = require('http');
var request = require('request');

var Verify = require('./verify');
var AutoIncrement = require('../auto_increment');
//var TransactionId = require('../models/transactionid');

var app = express();

var router = express.Router();
router.use(bodyParser.json());

// POST payment details
router.route('/')



.post(Verify.verifyOrdinaryUser, function(req, res, next){
    var data = req.body ;
    console.log(req.decoded.username);
    var key = data.merchantKey;
    var salt = data.salt;
    var amount = data.amount;
    var productinfo = data.productinfo;
    var firstname = req.decoded.firstname;
    var email = req.decoded.email;
    var txnid ={};
    AutoIncrement.getNextSequenceValue("transactionId", function(transactionid){
         txnid = transactionid;
        var hashText = key + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|||||||||||'  + salt ;
        var hashEncode = sha512(hashText);
        var payUParameters = {
            key : key,
            txnid : txnid,
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
            console.log(error);
            console.log(response.headers);
            console.log(response);
            console.log(body);
            var header = response.headers;
            res.writeHead(200,header);
            console.log(response.headers.location);
            res.end();
        });
    });
    
    
})


module.exports = router;

