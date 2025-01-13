import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 1000);
};

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error("Error retrieving checkout session: ", error);
    return NextResponse.json({
      error: { message: error.message },
      status: 500,
    });
  }
}

export async function POST(req) {
  const { subscriptionName, subscriptionValue } = await req.json();
  const params = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: subscriptionName,
          },
          unit_amount: formatAmountForStripe(subscriptionValue),
          recurring: {
            interval: "month",
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get(
      "origin"
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      "origin"
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
  };
  const checkoutSession = await stripe.checkout.sessions.create(params);

  return NextResponse.json(checkoutSession, {
    status: 200,
  });
}
