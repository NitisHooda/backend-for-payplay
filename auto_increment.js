var TransactionId = require('./models/transactionid');

exports.getNextSequenceValue = function(transactionId){
    var sequenceDocument =   TransactionId.findAndModify({
        query : {_id : transactionId},
        update : { $inc: {sequence_value : 1 }},
        new : true
    });
    return sequenceDocument.sequence_value;
};