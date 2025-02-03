"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiZap } from "react-icons/fi";
import { RazorpayResponse } from "../_constants";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { CurrencyCode } from "react-razorpay/dist/constants/currency";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function UpgradeButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("Upgrade to Pro");
  const { user } = useUser();
  const router = useRouter();
  const { Razorpay } = useRazorpay();
  const createSubscription = useMutation(api.users.createSubscription);
  const RAZORPAY_KEY_ID = `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}`;

  const handlePayment = async () => {
    if (!user) return;
    setValue("Loading");
    setIsLoading(true);

    try {
      const response = await fetch("/api/payment/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user?.username,
          emailId: user?.emailAddresses[0].emailAddress,
        }),
      });

      if (!response.ok) {
        console.error("Error while verifying payment - ", response);
        toast.error("Error while creating payment.");
        throw new Error("Error while creating payment");
      }
      
      const order = await response.json();

      const options: RazorpayOrderOptions = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency as CurrencyCode,
        name: "CodeDaily",
        description: `Payment of 2999 for upgradation of subscription plan on Code Daily.`,
        order_id: order.id,
        handler: verifyingPayment,
        prefill: {
          name: user?.fullName || "Guest",
          email: user?.emailAddresses[0].emailAddress || "johndoe@gmail.com",
        },
        theme: { color: "#3399cc" },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (error: any) {
      console.log("Error while creating payment - ", error);
      toast.error("Unknown Error Occurred.");
    } finally {
      setValue("Upgrade to Pro");
      setIsLoading(false);
    }
  };

  async function verifyingPayment(response: RazorpayResponse) {
    try {
      setIsLoading(true);
      setValue("Verifying");
      const verifyResponse = await fetch("/api/payment/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      if (!verifyResponse.ok) {
        console.error("Error while verifying payment - ", verifyResponse);
        toast.error("Payment verification failed. Please contact support.");
        throw new Error("Error while verifying payment");
      }

      await createSubscription({
        order_id: response.razorpay_order_id,
        payment_id: response.razorpay_payment_id,
      });

      toast.success("Subscription purchased successfully");
      setValue("Redirecting");
      router.push("/");
    } catch (err: any) {
      console.log("Error while verifying payment - ", err);
      toast.error("Payment verification failed. Please contact support.");
      setValue("Upgrade to Pro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={handlePayment}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 rounded-full border-4 border-white/[0.05] border-t-white animate-spin" />
          ...{value}
        </>
      ) : (
        <>
          <FiZap className="w-5 h-5" />
          {value}
        </>
      )}
    </button>
  );
}
