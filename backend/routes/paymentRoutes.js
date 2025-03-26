const express = require("express");
const { startPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/initiate-payment", startPayment);

module.exports = router;
