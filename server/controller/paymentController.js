const Payment = require("../models/payment");
const { Requests } = require("../models/requests"); 

// Controller to handle creating a payment
exports.createPayment = async (req, res) => {
  try {
    const {
      userId,
      itemId,
      amount,
      paymentMethod,
      nameOfCard,
      numOfCard,
      month,
      year,
      code,
    } = req.body;

    if (
      !userId ||
      !itemId ||
      !amount ||
      !paymentMethod ||
      !nameOfCard ||
      !numOfCard ||
      !month ||
      !year ||
      !code
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create the payment
    const payment = await Payment.create({
      userId,
      itemId,
      amount,
      paymentMethod,
      nameOfCard,
      numOfCard,
      month,
      year,
      code,
    });
    console.log("Payment created:", payment);

    // Find the request
    const request = await Requests.findOne({ where: { id: itemId } });
    console.log("Request found:", request);

    if (request) {
      // Update the request's amount_raised
      request.amount_raised =
        parseFloat(request.amount_raised) + parseFloat(amount);
      await request.save();
      console.log("Request updated:", request);
    } else {
      return res.status(404).json({ message: "Request not found" });
    }

    // Send success response
    res
      .status(201)
      .json({ message: "Payment processed successfully", payment });
  } catch (error) {
    console.error("Error processing payment:", error);
    res
      .status(500)
      .json({ message: "Failed to process payment", error: error.message });
  }
};
