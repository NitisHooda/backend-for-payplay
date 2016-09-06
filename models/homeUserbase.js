var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var VitalSchema = new Schema({
            HR : {
                type: String
            },
            RR : {
                type : String
            },
            Hb : {
                type : String
            },
            SPO2 : {
                type : String
            },
            Dystolic : {
            type : String
            },
            Systolic  : {
            type : String
        }
            
    },{timeStamp : true});

var profileSchema = new Schema({
        profileName : {
            type : String,

        },
        Vitals : [VitalSchema],
        phoneNumber : {
            type : String
        },
        otp : {
            type : String
            }
    },{timeStamp : true});

var Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;