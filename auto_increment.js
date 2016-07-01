var express = require('express')
var bodyParser = require('body-parser')
var TransactionIds = require('./models/transactionid');

var router = express.Router();
router.use(bodyParser.json());

exports.getNextSequenceValue = function(transactionId, fn){
    console.log("all well upto here");
    var sequenceDocument = {};
    TransactionIds.findOneAndUpdate({_id : "transactionId"}, { $inc: {sequence_value : 1 }}, function(err, doc){
                                    
    
        console.log(doc);
        console.log(doc.sequence_value);
        fn(doc.sequence_value);
    });
    
    };