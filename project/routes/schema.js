var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var payschema= new Schema({
    cardHoldername: {type:String, required:true},
    cardNumber: {type:Number, required:true},
    expiryMonth:{type:Number, required:true},
    expiryYear:{type:Number, required:true},
    cvv:{type:Number, required:true}
});

var addressSchema= new Schema({
    address:{type:String, required:true},
    city:{type:String, required:true},
    state:{type:String, required:true},
    phone:{type:Number, required:true}
});

module.exports = mongoose.model('Payment', payschema);
module.exports = mongoose.model('Address',addressSchema);