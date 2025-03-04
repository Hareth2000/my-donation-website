const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

// POST request to process payment
router.post('/', paymentController.createPayment);

module.exports = router;
