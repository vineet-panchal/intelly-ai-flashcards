import { loadStripe } from "@stripe/stripe-js";
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);
    console.log("stripe promise: ", stripePromise);
  }
  return stripePromise;
};

export default getStripe;
