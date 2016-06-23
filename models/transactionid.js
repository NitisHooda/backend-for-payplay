var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var transactionIdSchema = new Schema({
    _id : "transactionId",
    sequence_value : 0
});

var TransactionId = mongoose.model('TransactionId', transactionIdSchema);

module.exports = TransactionId;