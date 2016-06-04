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
    var firstname = req.decoded._doc.username;
    var email = req.decode._doc.email;
    var txnid = 'qwerty';
    console.log(data);
    //var payu = new PayU(key, salt, 'https://test.payu.in/merchant/postservice.php?form=2');
    var hashText = key + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|||||||||||'  + salt ;
    console.log(hashText);
    var hashEncode = sha512(hashText);
    var payUParameters = {
        key : key,
        txnid : 'qwerty',
        amount : amount,
        productinfo : productinfo,
        firstname : 'nitish',
        email : 'nitish@whiite.co',
        phone : '9999844420',
        surl : 'http://localhost:3000/success',
        furl : 'http://localhost:3000/failure',
        hash : hashEncode.toString('hex'),
        service_provider : 'payu_paisa'
    };
    //var hash = hashEncode.digest('hex');
    //console.log(hashEncode);
    console.log(payUParameters);
    request({
       uri : 'https://test.payu.in/_payment',
       method : 'POST',
       form : payUParameters,
    },function(error, response, body){
        console.log(response.headers);
        console.log(response);
        console.log(body);
        var header = response.headers;
        res.writeHead(200,header);
        console.log(response.headers.location);
        res.end();
    });
})


module.exports = router;

