"use client";

import CheckoutForm from "@/components/payment/CheckoutForm";
// import { selectedCarAmountContext } from "@/context/SelectedCarAmount";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

function Payment() {
  //   const { carAmount, setCarAmount } = useContext(selectedCarAmountContext);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLICATION_KEY as any
  );
  const options: any = {
    mode: "payment",
    // amount: carAmount,
    amount: 50,
    currency: "usd",
  };

  return (
    <div className="items-center  text-white">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Payment;
