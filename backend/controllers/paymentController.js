//const { initiatePaytmPayment } = require("../utils/paytm");

exports.startPayment = async (req, res) => {
  const { textbookId } = req.body;
  const paymentUrl = await initiatePaytmPayment(textbookId);
  res.json({ paymentUrl });
};
