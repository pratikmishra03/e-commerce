const { response } = require("express");

const router = require("express").Router();
const stripe = require("stripe")("sk_test_51OtUVPSBMoBUZEjBXLJluevbUGgDzfvri8M3J7sARl7r3OcE40HXFJrWon0X8QF2d5F98J8X8qHYidbxZnEiZfnB00GtwOhCmD");

router.post("/payment", async (req, res) => {
  const { tokenId, amount } = req.body;

  try {
    // Create a Source object from the token
    const source = await stripe.sources.create({
      type: 'card',
      token: tokenId,
    });

    // Create a PaymentIntent using the Source
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      payment_method_types: ['card'],
      source: source.id,
    });

    // Respond with the PaymentIntent object
    res.status(200).json(paymentIntent);
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// router.post("/payment", async (req, res) => {
//   const { tokenId, amount } = req.body;
//   const session = await stripeInstance.checkout.session.create({
//     line_items: [
//       {
//         source: tokenId,
//         amount: amount,
//         currency: "inr",
//       },
//     ],
//     mode: "payment",
//     success_url: "",
//     cancel_url: "",
//   });

//   res.redirect(303, session.url)
// });

module.exports = router;
