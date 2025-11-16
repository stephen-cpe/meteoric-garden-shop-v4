import { Meteor } from "meteor/meteor"
import { Categories, Products, Orders } from "./collections"

if (Meteor.isServer) {
  // Publish all categories
  Meteor.publish("categories", () => Categories.find())

  // Publish all products
  Meteor.publish("products", () => Products.find())

  // Publish user's orders
  Meteor.publish("userOrders", function () {
    if (!this.userId) {
      return this.ready()
    }
    return Orders.find({ userId: this.userId })
  })

  // Publish all orders (admin only)
  Meteor.publish("allOrders", function () {
    if (!this.userId) {
      return this.ready()
    }
    const user = Meteor.users.findOne(this.userId)
    if (user && user.isAdmin) {
      return Orders.find()
    }
    return this.ready()
  })
}
