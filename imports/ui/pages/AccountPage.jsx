"use client"
import React from "react"
import { navigate } from "../Router"
import { useTracker } from "meteor/react-meteor-data"
import { Meteor } from "meteor/meteor"
import { Orders } from "../../api/collections"
import Header from "../components/Header"

export default function AccountPage() {

  const { user, orders } = useTracker(() => {
    const user = Meteor.user()
    const ordersReady = Meteor.subscribe("userOrders").ready()
    return {
      user,
      orders: ordersReady ? Orders.find({ userId: user?._id }).fetch() : [],
    }
  })

  if (!user) {
    navigate("/login")
    return null
  }

  const handleLogout = () => {
    Meteor.logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="home" />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">My Account</h1>
          <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>

        <div className="bg-secondary rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-foreground/70">First Name</p>
              <p className="text-lg font-medium text-foreground">{user.profile?.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Last Name</p>
              <p className="text-lg font-medium text-foreground">{user.profile?.lastName}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-foreground/70">Email</p>
              <p className="text-lg font-medium text-foreground">{user.emails?.[0]?.address}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-foreground/70">You haven't placed any orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-secondary rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-foreground/70">Order ID: {order._id}</p>
                      <p className="text-sm text-foreground/70">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        order.status === "delivered"
                          ? "bg-green-200 text-green-800"
                          : order.status === "cancelled"
                            ? "bg-red-200 text-red-800"
                            : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-right pt-3 border-t border-foreground/20">
                    <p className="text-lg font-semibold text-primary">
                      Total: ${Number.parseFloat(order.totalAmount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}