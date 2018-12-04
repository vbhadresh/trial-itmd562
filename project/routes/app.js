var express = require('express');
var router = express.Router();
var payment= require('../routes/payment');
var checkout = require('../routes/checkout');


router.post('/payment',payment);

router.get('/checkout',checkout);

router.post('/checkout',checkout);

module.exports = router;