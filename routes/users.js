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
  User.find({},function(err,user){
      if (err) {
        throw err;
      }
      res.json(user);
    });
})

.post(function(req,res,next){
  //console.log(req.body.password);
  User.register(new User({username : req.body.username, email : req.body.email}), req.body.password, function(err, user){
                  if(err){
                          console.log(err.errors);
                          return res.status(500).json({err : err});  
                        }
                  passport.authenticate('local')(req, res, function(){
                                            return res.status(200).json({ status : 'Registration Successful'}); 
                                          });
  });
  
 /* //console.log(req.body);
  //var data = req.body;
  //console.log(data.username);
  var user = new User({
      username : data.username ,
      password : data.password
    });
  //console.log(user);
  
  user.save(function(err,resp) {
        if(err) {
            console.log(err.status);
            var error =  new Error("Username is not available");
            res.writeHead(403, error.message, { 'content-Type' : 'text/plain' });
            res.end(error.message);
        } else {
            res.send({
                message:'the user has been saved'
            });
        }           

    });*/
  
})

module.exports = router;
