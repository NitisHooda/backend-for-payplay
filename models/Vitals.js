var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var VitalDataSchema = new Schema({
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
            Diastolic : {
                type : String
            },
            Systolic  : {
                type : String
        }
    },{timeStamp : true});

var VitalSchema = new Schema({
            profileId : {
                type : String
            },
            VitalData : [VitalDataSchema]
           
            
    },{timeStamp : true});

var Vital = mongoose.model('Vital', VitalSchema);

module.exports = Vital;