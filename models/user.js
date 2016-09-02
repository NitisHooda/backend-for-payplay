var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//create schema for transaction
var transactionSchema = new Schema({
    txnid : {
        type: String,
       // unique: true
    },
    amount : {
        type: String,
    },
    productInfo : {
        type: String,
    },
    status:{
        type: String
    },
    Date : {
        type: String
    },
    PayuTransactionID:{
        type : String
    }
    
});
//delete it
var profileSchema = new Schema({
    person1:{
        type: String,
        default : "nitish"
    },
    persone2:{
        type:String,
        default:"vishnu"
    }
    });
//create schema
var User = new Schema({
    username: {
        type: String,
        unique: true
        },
    firstname:{
        type: String,
    },
    lastname:{
        type: String,
    },
    password: {
        type: String,
        },
    email : {
        type : String,
        unique : true
    },
    phoneNumber : {
        type :  String,
    },
    transactions: [transactionSchema],
    admin:{
        type : Boolean ,
        default : false
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpires : {
        type: Date
    },
    profile:[profileSchema],
    otp:{
        type:String
    }
    },
    {timestamps: true}
);

User.plugin(passportLocalMongoose);

//create model of schema
var User = mongoose.model('User',User);

module.exports = User;
