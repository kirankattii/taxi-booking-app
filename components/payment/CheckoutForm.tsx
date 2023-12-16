import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import React from "react";

function CheckoutForm() {
  const stripe: any = useStripe();
  const elements: any = useElements();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!elements || !elements.getElement(PaymentElement)) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }

    //Create the payment and obtain Clientserete from your
    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: 50,
      }),
    });

    const secretKey = await res.json();
    //const {client_secret:clientserete}=await res.json();
    // console.log(secretKey);
    const { error } = await stripe.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    });
  };

  return (
    <div className=" ;g:flex sm:justify-cente pl-8 m-auto sm:items-center mt-[40px] w-full lg:ml-[500px] ">
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement className="text-white" />
        <button
          type="submit"
          className="text-black font-bold cursor-pointer w-full bg-yellow-500 p-2 rounded-lg mt-5 "
          disabled={!stripe || elements}
        >
          pay
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
