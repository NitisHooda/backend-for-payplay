var express = require('express')
var bodyParser = require('body-parser');
var Verify = require('./verify');
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
        var token = Verify.getToken(user.phoneNumber);
        var profileData = user.profile;
        var array_size = profileData.length;
        var profile = {};
        for(var i=0; i <array_size; i++){
             
                profile[i] = profileData[i].profileName;   
             
        }
        console.log(profile);
        //var token = "teyu";
        console.log("valid user");
        //User.findOne({username:"nitish"}, function(err,user){
            //console.log("yes" + user);
            res.status(200).json({profile : profile , token :  token});     
        
      }
      else{
        console.log("invalid user");
        res.status(404).json("Wrong Otp");
      }
    
  });
    
})

router.post('/token',Verify.verifyOrdinaryUser, function(req, res, next){
    console.log(req.body);
    console.log(req.decoded);
    Profile.findOne({phoneNumber:req.decoded}, function(err, user){
    if (err) {
        console.log(err);
    }
    else {
        var profileData = user.profile;
        var array_size = profileData.length;
        var profile = {};
        for(var i=0; i <array_size; i++){
             
                profile[i] = profileData[i].profileName;   
             
        }
        console.log(profile);
        //var token = "teyu";
        console.log("valid user");
        //User.findOne({username:"nitish"}, function(err,user){
            //console.log("yes" + user);
            res.status(200).json({profile : profile});     
        
      }
    
    });
})

module.exports = router;