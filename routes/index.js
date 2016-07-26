var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',function(req, res, next){
  console.log(req.body);
  User.findOne({phoneNumber:req.body.phone}, function(err, user){
    if(err){
        console.log(err);
      }
    else{
      console.log("Successful");
    }
  });
});
router.post('/OTP', function(req, res, next){
  console.log(req.body);
  User.findOne({phoneNumber:req.body.phone}, function(err, user){
    if (err) {
        console.log(err);
    }
    else{
      if (user.opt == req.body.otp) {
        console.log("valid user");
        res.status(200).json("token");
      }
      else{
        console.log("invalid user");
      }
    }
  });
  
});

module.exports = router;
