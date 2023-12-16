import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: null as any, // @ts-ignore
});

export async function POST(request: any) {
  const data: any = await request.json();
  const amount = data.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: "USD",
    });
    return NextResponse.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create PaymentIntent" },
      { status: 400 }
    );
  }
}
