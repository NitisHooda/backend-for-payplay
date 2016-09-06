var express = require('express')
var bodyParser = require('body-parser');

var User = require('../models/user');
var Profile = require('../models/homeUserbase');
//var TransactionId = require('../models/transactionid');

var app = express();

var router = express.Router();
router.use(bodyParser.json());

// POST payment details
router.route('/')
.post(function(req, res, next){
    console.log(req.body);
    Profile.findOne({phoneNumber:req.body.PHONENUMBER}, function(err, user){
    if (err) {
        console.log(err);
    }
    else if (user.otp == req.body.ENTEREDOTP){
        //var token = Verify.getToken(user.phoneNumber);
        //var token = "teyu";
        console.log("valid user");
        User.findOne({username:"nitish"}, function(err,user){
            //console.log("yes" + user);
            res.status(200).json(user.profile);     
        });
      }
      else{
        console.log("invalid user");
      }
    
  });
    
})

module.exports = router;