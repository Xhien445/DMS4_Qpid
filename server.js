const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_51RR3f9GauXhdX8osgF1uh5VZt8QaeGADjmkFU2XEowjmRAQjzwW0xMCOrjCTSQQrHxLVW7vOwFO7OtsqJ1rBDtEe00f90dMmZG"); // Use your real secret key
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'vnd',
        product_data: {
          name: 'Qpid+ Premium Plan',
        },
        unit_amount: 30000, // 30,000 VND
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://yourdomain.com/success',
    cancel_url: 'https://yourdomain.com/cancel',
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log("Server running on http://localhost:4242"));
