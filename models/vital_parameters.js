var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var HR = new Schema({
    value : {
        type : String
        }
    }, {timestamps : true});

var RR = new Schema({
    value : {
        type : String
        }
    }, {timestamps : true});

var spo2 = new Schema({
    value : {
        type : String
        }
    }, {timestamps : true});

var DIA = new Schema({
    value : {
        type : String
        }
    }, {timestamps : true});

var SYS = new Schema({
    value : {
        type : String
        }
    }, {timestamps : true});

var Hemo = new Schema({
    value : {
        type : String
        }
    }, {timestamps : true});

var VitalSchema = new Schema({
        user_id : {
            type : String,
        },
        date : {
            type : String
        },
        heart_rate : [HR],
        respiration_rate : [RR],
        spo2 : [spo2],
        systolic : [SYS],
        diastolic : [DIA],
        Hemoglobin : [Hemo]
    });

var vital_parameter = mongoose.model('vital_parameter',VitalSchema);

module.exports = vital_parameter;