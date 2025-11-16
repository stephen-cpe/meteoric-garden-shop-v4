import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"
import { Accounts } from "meteor/accounts-base"
import { Products, Orders } from "./collections"

if (Meteor.isServer) {
  // User registration
  Meteor.methods({
    "users.register"(email, password, firstName, lastName) {
      check(email, String)
      check(password, String)
      check(firstName, String)
      check(lastName, String)

      if (Meteor.users.findOne({ emails: { $elemMatch: { address: email } } })) {
        throw new Meteor.Error("email-exists", "Email already registered")
      }

      if (password.length < 6) {
        throw new Meteor.Error("weak-password", "Password must be at least 6 characters")
      }

      const userId = Accounts.createUser({
        email,
        password,
        profile: {
          firstName,
          lastName,
        },
      })

      return userId
    },

    // Create order
    async "orders.create"(orderData) {
      check(orderData, Object)

      if (!orderData.items || orderData.items.length === 0) { 
        throw new Meteor.Error("empty-cart", "Cart cannot be empty")
      }

      const orderId = await Orders.insertAsync({
        // This will save the userId if they are logged in, or 'null' for guests
        userId: this.userId || null,
        items: orderData.items || [],
        totalAmount: orderData.totalAmount,
        deliveryType: orderData.deliveryType,
        deliveryDate: new Date(orderData.deliveryDate), 
        recipientFirstName: orderData.recipientFirstName,
        recipientLastName: orderData.recipientLastName,
        recipientEmail: orderData.recipientEmail,
        recipientPhone: orderData.recipientPhone || "",
        addressLine1: orderData.addressLine1,
        addressLine2: orderData.addressLine2 || "",
        city: orderData.city,
        state: orderData.state,
        zipCode: orderData.zipCode,
        specialMessage: orderData.specialMessage || "", 
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return orderId
    },

    

    // Update order status (admin only)
    "orders.updateStatus"(orderId, newStatus) {
      check(orderId, String)
      check(newStatus, String)

      const user = Meteor.users.findOne(this.userId)
      if (!user || !user.isAdmin) {
        throw new Meteor.Error("not-authorized", "Admin access required")
      }

      Orders.update(orderId, {
        $set: {
          status: newStatus,
          updatedAt: new Date(),
        },
      })
    },

    // Cancel order
    "orders.cancel"(orderId) {
      check(orderId, String)

      const order = Orders.findOne(orderId)
      if (!order) {
        throw new Meteor.Error("order-not-found", "Order not found")
      }

      if (order.userId !== this.userId) {
        throw new Meteor.Error("not-authorized", "Not authorized to cancel this order")
      }

      if (order.status !== "pending") {
        throw new Meteor.Error("invalid-status", "Can only cancel pending orders")
      }

      Orders.update(orderId, {
        $set: {
          status: "cancelled",
          updatedAt: new Date(),
        },
      })
    },

    // Update product stock
    "products.updateStock"(productId, newStock) {
      check(productId, String)
      check(newStock, Number)

      const user = Meteor.users.findOne(this.userId)
      if (!user || !user.isAdmin) {
        throw new Meteor.Error("not-authorized", "Admin access required")
      }

      Products.update(productId, {
        $set: {
          stock_quantity: newStock,
          updatedAt: new Date(),
        },
      })
    },
  })
}
