var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var transactionIdSchema = new Schema({
    _id : {
            type: String,
            value : "transactionId"
        },
    sequence_value : 0
});

var TransactionIds = mongoose.model('TransactionId', transactionIdSchema);

module.exports = TransactionIds;