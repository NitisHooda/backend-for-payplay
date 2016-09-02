var express = require('express')
var bodyParser = require('body-parser');

var User = require('../models/user');
//var TransactionId = require('../models/transactionid');

var app = express();

var router = express.Router();
router.use(bodyParser.json());

// POST payment details
router.route('/')
.get(function(req, res, next){
    User.findOne({username:"nitish"}, function(err,user){
        res.send(user.profile);     
    });
})

module.exports = router;