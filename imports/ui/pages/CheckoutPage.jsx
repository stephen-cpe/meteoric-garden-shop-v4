"use client"

import React, { useState } from "react"
import { navigate } from "../Router"
import { Meteor } from "meteor/meteor"
import { useTracker } from "meteor/react-meteor-data"
import Header from "../components/Header"
import { useStore } from "../../store/cartStore"

export default function CheckoutPage() {
  const user = useTracker(() => Meteor.user())
  const items = useStore((state) => state.items)
  const clearCart = useStore((state) => state.clearCart)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderContact: "",
    receiverName: "",
    deliveryType: "delivery",
    deliveryDate: "",
    deliveryLocation: "",
    specialMessage: "",
  })

  const total = items.reduce((sum, item) => sum + Number.parseFloat(item.price), 0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      if (items.length === 0) {
        throw new Error("Cart is empty")
      }

      if (!paymentMethod) {
        throw new Error("Please select a payment method")
      }

      await new Promise((resolve, reject) => {
        Meteor.call(
          "orders.create",
          {
            items: items.map((item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
            })),
            totalAmount: total.toFixed(2),
            ...formData,
          },
          (err) => {
            if (err) reject(err)
            else resolve()
          },
        )
      })

      clearCart()
      navigate("/order-complete")
    } catch (err) {
      setError(err.message || "Failed to submit order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="shop" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Products Ordered</h2>
              <div className="space-y-4">
                {items.length > 0 ? (
                  items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-secondary rounded-lg">
                      <div className="w-20 h-20 bg-gray-300 rounded">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{item.name}</h3>
                        <p className="text-sm text-foreground/70">Quantity: 1</p>
                        <p className="text-green font-semibold mt-1">${Number.parseFloat(item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-foreground">Your cart is empty</p>
                )}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-dark-green">
                <span className="text-xl font-semibold text-foreground">Total:</span>
                <span className="text-xl font-semibold text-green">${total.toFixed(2)}</span>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Payment Method</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Debit / Credit Card", "Online Banking", "PayPal", "Google Pay"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 border-4 ${
                      paymentMethod === method
                        ? "border-primary text-white bg-primary"
                        : "border-brown text-muted-foreground hover:bg-primary hover:text-white"
                    } transition-colors`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Fill Up Form</h2>
            <form className="space-y-4" onSubmit={handleSubmitOrder}>
              {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

              <h3 className="text-xl font-semibold text-foreground mb-4">Sender Information</h3>
              <input
                type="text"
                name="senderName"
                placeholder="Sender Name"
                value={formData.senderName}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-dark-green rounded-lg focus:border-primary focus:outline-none"
                required
              />
              <input
                type="email"
                name="senderEmail"
                placeholder="Sender Email"
                value={formData.senderEmail}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-dark-green rounded-lg focus:border-primary focus:outline-none"
                required
              />
              <input
                type="tel"
                name="senderContact"
                placeholder="Sender Contact No."
                value={formData.senderContact}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-dark-green rounded-lg focus:border-primary focus:outline-none"
              />

              <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Receiver Information</h3>
              <input
                type="text"
                name="receiverName"
                placeholder="Receiver Name"
                value={formData.receiverName}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-dark-green rounded-lg focus:border-primary focus:outline-none"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    name="deliveryType"
                    value={formData.deliveryType}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-dark-green rounded-lg focus:border-primary focus:outline-none"
                  >
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                  </select>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-dark-green rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <input
                  type="text" 
                  name="deliveryLocation"
                  placeholder="Delivery Location"
                  value={formData.deliveryLocation}
                  onChange={handleInputChange}
                  className="w-full p-3 pr-10 border-2 border-dark-green rounded-lg focus:border-primary focus:outline-none" 
                  required
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"> 
                  <svg 
                    className="w-5 h-5 text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg" 
                  >
                    <path strokeLinecap="round"  strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /> 
                  </svg>
                </div>
              </div>

              <textarea
                name="specialMessage"
                placeholder="Message to the receiver (optional)"
                value={formData.specialMessage}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border-2 border-dark-green rounded-lg focus:border-primary focus:outline-none resize-none"
              />

              <button
                type="submit"
                disabled={items.length === 0 || isSubmitting || !paymentMethod}
                className="w-full bg-dark-green text-white py-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isSubmitting ? "Processing..." : "Submit Order"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}
