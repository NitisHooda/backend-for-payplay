var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Profile = require('../models/homeUserbase');
var Test = require('../models/vital_parameters');
var Vitals = require('../models/Vitals');
var Verify = require('./verify');
var passport = require('passport');
var mysql = require('mysql');

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
  Profile.findOne({phoneNumber:req.body.phoneNumber}, function(err, user){
    if (err) {
        console.log(err);
    }
    else if (user == null) {
        //code
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
    }
    else {
      user.profile.push({
                profileName : req.body.profileName,
                Age : req.body.Age,
                Weight : req.body.Weight,
                Height : req.body.Height,
                _id : req.body._id
          });
        user.save(function(err, profile){
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

router.get('/fetch_Profile', function(req, res, next){
  var connection = mysql.createConnection({
  host    : '52.35.170.33',
  port     : '3307',
  user     : 'root',
  password : '',
  database : 'Medaino_development'
});
  
  connection.connect();
  var Profiles = [];
  connection.query('SELECT * FROM users WHERE id=18', function(err, row){
      if (err) {
        console.log(err);
        res.send(err);
      }
      else{
        var data = {
          weight : row[0].weight,
          height : row[0].height,
          gender : row[0].gender
        }
        Profiles[0] = data;
        Profiles[1] = data;
        console.log(Profiles);
        res.send(Profiles);  
      }
    });
  connection.end();
});

router.get('/date', function(req, res, next){
  var date = new Date();
  date.setHours(date.getHours()+5);
  date.setMinutes(date.getMinutes()+30);
  var date2 = new Date();
  var zerohour_date = date2.setHours(0,0,0,0);
  var date1= new Date(zerohour_date);
res.status(200).json({zerohour_Date: "ISODate('"+date1.toISOString()+"')", currentDate : "ISODate('"+date.toISOString()+"')"});
});

router.post('/vitals', function(req, res, next){
    console.log(req.body);
    var date = new Date();
    console.log(date);
    var date1 = date.setHours(5, 30, 0, 0);
    console.log(date1);
    var date2 = new Date(date1);
    console.log(date2);
    var date3 = date2.toISOString();
    console.log(date3);
    //Test.findOne()
    Test.findOne({"user_id":req.body.user_id}, function(err, user){
        console.log(user);
        if (err) {
            //code
            console.log(err);
        }
        
        else if(user==null){
          
          var test = new Test({
              user_id : req.body.user_id,
              date :  date3
            });
          console.log('new data');
          test.save(function(err, doc){
            console.log(doc);
            doc.heart_rate.push({
              value : req.body.hr,
              created_at : new Date(),
              percentage : "97"
              });
            doc.spo2.push({
              value : req.body.spo2,
              created_at : new Date(),
              percentage : "98"
              });
            doc.diastolic.push({
              value : req.body.diastolic,
              created_at : new Date(),
              percentage : "99"
              });
            doc.respiration_rate.push({
              value : req.body.rr,
              created_at : new Date(),
              percentage : "100"
              });
            doc.systolic.push({
              value : req.body.systolic,
              created_at : new Date(),
              percentage : "70"
              });
            doc.save(function(err, doc1){
              if (err) {
                console.log(err);
                res.send(err);
              }
              console.log(doc1);
              res.send(doc1);
              });
            
            });
        }
        else{
          console.log('pre data');
            user.heart_rate.push({
              value : req.body.hr
              });
            user.spo2.push({
              value : req.body.spo2
              });
            user.diastolic.push({
              value : req.body.diastolic
              });
            user.respiration_rate.push({
              value : req.body.rr
              });
            user.systolic.push({
              value : req.body.systolic
              });
            user.save(function(err, doc1){
              if (err) {
                console.log(err);
                res.send(err);
              }
              console.log(doc1);
              res.send(doc1);
              });
        }
      });
    //Profile.findOne({phoneNumber : req.body.PHONENUMBER}, function(err, user){
    //  if (err){
    //      console.log(err);
    //      res.status(400).json("Something went wrong. Please try again.");
    //    }
    //  else if(user == null){
    //      res.status(401).json("Incorrect Phone Number");
    //    }
    //  else{
    //      Vitals.findOne({profileId : req.body.profileId}, function(err, doc){
    //          if (err) {
    //            console.log(err);
    //            res.status(400).json("Something went wrong. Couldn't save the data");
    //          }
    //          else if (doc == null) {
    //            var vitals = new Vitals({
    //                profileId : req.body.profileId,
    //              });
    //            vitals.save(function(err, doc){
    //                if (err) {
    //                    console.log(err);
    //                    res.send("booom");
    //                }
    //                else{
    //                  console.log(doc);
    //                  doc.VitalData.push({
    //                    HR : req.body.Heart_rate,
    //                    RR : req.body.Respiration_rate,
    //                    Hb : req.body.Haemoglobin,
    //                    SPO2 : req.body.spo2,
    //                    Diastolic : req.body.Diastolic,
    //                    Systolic : req.body.Systolic
    //                  });
    //                  doc.save();
    //                  res.send(doc);
    //                }
    //            });
    //          }
    //          else {
    //            doc.VitalData.push({
    //              HR : req.body.Heart_rate,
    //              RR : req.body.Respiration_rate,
    //              Hb : req.body.Haemogobin,
    //              SPO2 : req.body.spo2,
    //              Diastolic : req.body.Diastolic,
    //              Systolic : req.body.Systolic
    //            });
    //            doc.save(function(err, doc){
    //                if (err) {
    //                    console.log(err);
    //                    res.send("not well");
    //                }
    //                else{
    //                  console.log(doc);
    //                  res.send(doc);
    //                }
    //            });
    //          } 
    //        
    //      });
    //  }
    //});
});
module.exports = router;
