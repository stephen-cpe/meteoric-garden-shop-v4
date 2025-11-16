import React from "react";
import { useTracker } from "meteor/react-meteor-data"
import { Meteor } from "meteor/meteor"
import { Orders, Products } from "../../api/collections"
import Header from "../components/Header"
import { AlertCircle } from "lucide-react"

export default function AdminPage() {
  const { user, orders, products } = useTracker(() => {
    const user = Meteor.user()
    const ordersReady = Meteor.subscribe("allOrders").ready()
    const productsReady = Meteor.subscribe("products").ready()

    return {
      user,
      orders: ordersReady ? Orders.find().fetch() : [],
      products: productsReady ? Products.find().fetch() : [],
    }
  })

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground text-lg">Access denied. Admin only.</p>
      </div>
    )
  }

  const lowStockItems = products.filter((p) => p.stock_quantity <= 5)
  const pendingOrders = orders.filter((o) => o.status === "pending").length

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="home" />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary rounded-lg p-6">
            <h3 className="text-sm font-medium text-foreground/70 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-foreground">{orders.length}</p>
          </div>
          <div className="bg-secondary rounded-lg p-6">
            <h3 className="text-sm font-medium text-foreground/70 mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold text-primary">{pendingOrders}</p>
          </div>
          <div className="bg-secondary rounded-lg p-6">
            <h3 className="text-sm font-medium text-foreground/70 mb-2">Low Stock Items</h3>
            <p className="text-3xl font-bold text-red-600">{lowStockItems.length}</p>
          </div>
        </div>

        {lowStockItems.length > 0 && (
          <div className="mb-8 p-4 bg-yellow-100 border-l-4 border-yellow-600 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-900">Low Stock Alert</h3>
                <p className="text-sm text-yellow-800">
                  {lowStockItems.map((item) => item.name).join(", ")} are running low.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Orders</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {orders.length === 0 ? (
                <p className="text-foreground/70">No orders yet.</p>
              ) : (
                orders.slice(-5).map((order) => (
                  <div key={order._id} className="bg-secondary rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-foreground">Order {order._id}</p>
                        <p className="text-sm text-foreground/70">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-200 text-blue-800">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">${Number.parseFloat(order.totalAmount).toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Inventory Levels</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {products.map((item) => (
                <div key={item._id} className="bg-secondary rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-foreground/70">SKU: {item.sku || "N/A"}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.stock_quantity <= 2
                          ? "bg-red-200 text-red-800"
                          : item.stock_quantity <= 5
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                      }`}
                    >
                      {item.stock_quantity <= 2 ? "Critical" : item.stock_quantity <= 5 ? "Low" : "Good"}
                    </span>
                  </div>
                  <div className="w-full bg-foreground/20 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.stock_quantity <= 2
                          ? "bg-red-600"
                          : item.stock_quantity <= 5
                            ? "bg-yellow-600"
                            : "bg-green-600"
                      }`}
                      style={{ width: `${Math.min((item.stock_quantity / 20) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-foreground/70 mt-1">{item.stock_quantity} units in stock</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
