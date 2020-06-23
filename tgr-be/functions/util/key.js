require("dotenv").config();

const tcKey = process.env.TC_KEY;
const stripeKey = process.env.STRIPE_KEY;
const firebaseKey = process.env.FIREBASE_KEY;

module.exports = {
  tcKey,
  stripeKey,
  firebaseKey,
};
