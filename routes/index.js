var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Profile = require('../models/homeUserbase');
var Vitals = require('../models/Vitals');
var Verify = require('./verify');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',function(req, res, next){
  console.log(req.body);
  Profile.findOne({phoneNumber:req.body.PHONENUMBER}, function(err, user){
    if(err){
        console.log(err);
        res.status(400).json("Try Again");
      }
    else if (user == null) {
        res.status(400).json("Wrong Phone Number");
    }
    else{
      console.log(user);
      user.otp = req.body.OTP;
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

router.post('/createProfile', function(req, res, next){
    var profile = new Profile({phoneNumber : req.body.phoneNumber});
    profile.save(function(err, profile){
      if (err) {
        console.log(err);
        res.send("bull");
      }
      else{
        console.log(profile);
        //res.send("shit");
        profile.profile.push({
                profileName : req.body.profileName,
                Age : req.body.Age,
                Weight : req.body.Weight,
                Height : req.body.Height,
                _id : req.body._id
          });
        profile.save(function(err, profile){
            if (err) {
              console.log(err);
              res.send("bull");
            }
            else{
              console.log(profile);
              res.send("nonsense");
            }
          })
      }
      })
  });

router.post('/OTP', function(req, res, next){
  console.log(req.body);
  Profile.findOne({phoneNumber:req.body.PHONENUMBER}, function(err, user){
    console.log(user.profile.profileName);
     //   console.log(req.body.VALIDOTP);
    if (err) {
        console.log(err);
        res.status(400).json("Something went wrong");
    }
    else if(user == null){
          res.status(401).json("Phone Number doesn't match");
      }
      else if (user.otp == req.body.ENTEREDOTP) {
        
      
        var token = Verify.getToken(user.phoneNumber);
        //var token = "teyu";
        console.log("valid user");
        res.status(200).json({token : token});
      }
      else{
        console.log("invalid user");
        res.status(400).json("Wrong Otp");
      }
    
  });
  
});

router.post('/vitals', function(req, res, next){
    console.log(req.body);
    Profile.findOne({phoneNumber : req.body.PHONENUMBER}, function(err, user){
      if (err){
          console.log(err);
          res.status(400).json("Something went wrong. Please try again.");
        }
      else if(user == null){
          res.status(401).json("Incorrect Phone Number");
        }
      else{
          Vitals.findOne({profileId : req.body.profileId}, function(err, doc){
              if (err) {
                console.log(err);
                res.status(400).json("Something went wrong. Couldn't save the data");
              }
              else if (doc == null) {
                var vitals = new Vitals({
                    profileId : req.body.profileId,
                  });
                vitals.save(function(err, doc){
                    if (err) {
                        console.log(err);
                        res.send("booom");
                    }
                    else{
                      console.log(doc);
                      doc.VitalData.push({
                        HR : req.body.Heart_rate,
                        RR : req.body.Respiration_rate,
                        Hb : req.body.Haemoglobin,
                        SPO2 : req.body.spo2,
                        Diastolic : req.body.Diastolic,
                        Systolic : req.body.Systolic
                      });
                      doc.save();
                      res.send(doc);
                    }
                });
              }
              else {
                doc.VitalData.push({
                  HR : req.body.Heart_rate,
                  RR : req.body.Respiration_rate,
                  Hb : req.body.Haemogobin,
                  SPO2 : req.body.spo2,
                  Diastolic : req.body.Diastolic,
                  Systolic : req.body.Systolic
                });
                doc.save(function(err, doc){
                    if (err) {
                        console.log(err);
                        res.send("not well");
                    }
                    else{
                      console.log(doc);
                      res.send(doc);
                    }
                });
              } 
            
          });
      }
    });
});
module.exports = router;
