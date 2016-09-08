var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProfileNameSchema = new Schema({
                profileName : {
                        type : String
                },
                Age : {
                        type :String
                },
                Weight : {
                        type : String
                },
                Height : {
                        type: String
                },
                _id : {
                        type : String
                }
        },{timeStamp : true});

var profileSchema = new Schema({
        profile : [ProfileNameSchema],
        phoneNumber : {
            type : String
        },
        otp : {
            type : String
            }
    },{timeStamp : true});

var Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;