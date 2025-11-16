import { Mongo } from "meteor/mongo"
import { Meteor } from "meteor/meteor"

// Collections
export const Categories = new Mongo.Collection("categories")
export const Products = new Mongo.Collection("products")
export const Users = Meteor.users
export const Orders = new Mongo.Collection("orders")
export const OrderItems = new Mongo.Collection("orderItems")
export const CustomRequests = new Mongo.Collection("customRequests")

// Indexes
if (Meteor.isServer) {
  Categories.rawCollection().createIndex({ name: 1 }, { unique: true })
  Products.rawCollection().createIndex({ categoryId: 1 })
  Products.rawCollection().createIndex({ name: "text", description: "text" })
  Orders.rawCollection().createIndex({ userId: 1, createdAt: -1 })
  Orders.rawCollection().createIndex({ status: 1 })
  CustomRequests.rawCollection().createIndex({ createdAt: -1 })

  Categories.rawCollection().createIndex({ createdAt: -1 })
  Products.rawCollection().createIndex({ createdAt: -1 })
  Orders.rawCollection().createIndex({ updatedAt: -1 })
}
