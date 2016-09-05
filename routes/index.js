var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Profile = require('../models/homeUserbase');
var Verify = require('./verify');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',function(req, res, next){
  console.log(req.body);
  Profile.findOne({phoneNumber:req.body.phone}, function(err, user){
    if(err){
        console.log(err);
        res.status(400).json("Try Again");
      }
    else if (user == null) {
        res.status(400).json("Wrong Phone Number");
    }
    else{
      console.log(user);
      user.otp = req.body.otp;
      user.save(function(err,user){
          if (err) {
            console.log(err);
          }
          else{
            console.log(user);
          }
        });
      res.status(200).json("valid User");
    }
  });
});
router.post('/OTP', function(req, res, next){
  console.log(req.body);
  Profile.findOne({phoneNumber:req.body.phone}, function(err, user){
    if (err) {
        console.log(err);
    }
    else{
      if (user.opt == req.body.otp) {
        var token = Verify.getToken(user.phoneNumber);
        console.log("valid user");
        res.status(200).json({token : token});
      }
      else{
        console.log("invalid user");
      }
    }
  });
  
});

router.post('/vitals', function(req, res, next){
    console.log(req.body);
    Profile.findOne({phoneNumber : req.decoded.phoneNumber}, function(err, user){
      if (err){
          console.log(err);
        }
      else{
        user.Vitals.push({
            HR : 0,
            RR : 0,
            Hb : 0,
            SPO2 : 0
          });
        user.Vitals.BP.push({
            Dystolic : 0,
            Systolic : 0
          });
        user.save();
        res.status(200).json("Succesfully done");
      }
      })
  });
module.exports = router;
