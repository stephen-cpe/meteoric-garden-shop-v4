import React from "react";
import Header from "../components/Header"
import StyledShopName from "../components/StyledShopName";

export default function OrderCompletePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="shop" />

      <main className="mx-auto max-w-5xl px-8 py-20 text-center">
        <h1 className="mb-12 text-6xl font-bold text-dark-green">Order Complete!</h1>
        <div className="mb-8 text-2xl text-dark-green">
          <span className="font-bold">Thank you for choosing, </span> 
          <StyledShopName className="text-5xl" />
        </div>
        <p className="text-xl text-dark-green">
          You'll receive an email shortly with all the details about your order.
        </p>
      </main>
    </div>
  )
}
