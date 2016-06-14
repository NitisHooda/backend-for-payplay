var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Verify = require('./verify');

var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.route('/')

.get(function(req, res, next) {
  var err = new Error("Bad Request");
  err.status = 400;
  throw  err;

})

.post(function(req,res,next){
  //console.log(req.body.password);
  User.register(new User({username : req.body.username, email : req.body.email, phoneNumber : req.body.phoneNumber}), req.body.password, function(err, user){
                  if(err){
                          console.log(err.errors);
                          return res.status(500).json({err : err});  
                        }
                  passport.authenticate('local')(req, res, function(){
                                            return res.status(200).json({ status : 'Registration Successful'}); 
                                          });
  });
  
})

module.exports = router;
