import React, { useContext, useState } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import DistanceTime from "./DistanceTime";
import { useRouter } from "next/navigation";
import { selectedCarAmountContext } from "@/context/SelectedCarAmount";

function Booking() {
  const screenHight =
    typeof window !== "undefined" ? window.innerHeight * 0.72 : 0;
  const { carAmount, setCarAmount } = useContext(selectedCarAmountContext);

  const router: any = useRouter();

  return (
    <div className="p-5 ">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className="border-[1px] p-5 
        rounded-md"
      >
        <AutocompleteAddress />

        <Cars />
        <Cards />
        <button
          className={`w-full
         bg-yellow-400
        p-1 rounded-md
        mt-4 ${!carAmount ? "bg-gray-200" : null} `}
          onClick={() => {
            router.push("/Payment");
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
