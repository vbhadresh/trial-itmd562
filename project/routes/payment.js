var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var resultArray=[];

var Payment = require('../routes/schema.js');
router.post('/payment',function(req,res,next){
   // console.log(req.body);
    mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true },function(err,db){
    var count=0;
    var payDet=[ new Payment({
        cardHoldername:req.body.cardholdersname,
        cardNumber:req.body.cardNumber,
        expiryMonth:req.body.month,
        expiryYear:req.body.year,
        cvv:req.body.cvv
    })];
    for(var z = 0; z < payDet.length; z++ ){

        payDet[z].save(function(err, result){
            count++;
            if (count == payDet.length)
                db.close();
        });
    }
    });
   mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true },function(err,db){
   /*var collection= db.collection('payments');
   collection.find().toArray(function(err,payitems){
       if(err) throw err;
      console.log(payitems.length);
       resultArray.push(payitems);
       for(var i in resultArray){
       console.log(resultArray[i]);
       }*/
       var collection= db.collection('addresses');
        collection.find().toArray(function(err,payitems){
       if(err) throw err;
      console.log(payitems.length);
       resultArray.push(payitems);
       for(var i in resultArray){
       console.log(resultArray[i])
       for(var res in resultArray[i]){
           console.log(res);
       }
    }
}); 
db.close();
});

    let transporter = nodemailer.createTransport({
        service: 'gmail',
       // port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'vaishu93.b@gmail.com', // generated ethereal user
            pass: 'sonicview' // generated ethereal password
        },
		tls:{rejectunauthorized:false}
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Order-Confirmation Mail" <vaishu93.b@gmail.com>', // sender address
        to: 'vaishnavi.bhadresh@gmail.com', // list of receivers
        subject: 'Order Confirmation Mail ', // Subject line
        text: 'Your Details is attached as below ', // plain text body
        html: '<h2>Your Order Details is attached as below</h2><br> <div> <h2>'+'Card Holder Name:'+req.body.cardholdersname+'</h2>'+
        '<h2>'+'Card Number:'+req.body.cardNumber + '</h2><div>'  // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		res.render('login',{msg:'OTP has been sent to your Registered Email Id. Please Enter it in Next Page'});
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

});



function saveComplete(){
    mongoose.disconnect();
}
module.exports = router ;