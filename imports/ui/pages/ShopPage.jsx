"use client"

import React, { useState } from "react"
import { useTracker } from "meteor/react-meteor-data"
import { navigate } from "../Router"
import { Products, Categories } from "../../api/collections"
import Header from "../components/Header"
import { ShoppingCart } from "lucide-react"
import { useStore } from "../../store/cartStore"
import { Meteor } from "meteor/meteor"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const addToCart = useStore((state) => state.addToCart)
  const cartCount = useStore((state) => state.items.length)

  const { products, categories, loading } = useTracker(() => {
    const categoriesHandle = Meteor.subscribe("categories")
    const productsHandle = Meteor.subscribe("products")

    return {
      products: Products.find().fetch(),
      categories: Categories.find().fetch(),
      loading: !categoriesHandle.ready() || !productsHandle.ready(),
    }
  }, [])

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.categoryId === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-dark-green">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="shop" />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-dark-green font-medium">Filter by:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-secondary rounded px-3 py-2 text-dark-green pr-8"
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="flex items-center border border-secondary rounded px-3 py-2 hover:bg-secondary"
          >
            <ShoppingCart className="w-5 h-5 text-dark-green mr-2" />
            <span className="text-dark-green font-medium">{cartCount}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-secondary rounded-lg overflow-hidden hover:shadow-lg">
              <div className="aspect-square bg-secondary">
                <img
                  src={product.image || "/placeholder.svg?height=300&width=300&query=flower"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-dark-green font-medium mb-2">{product.name}</h3>
                <p className="text-dark-green mb-3">${Number.parseFloat(product.price).toFixed(2)}</p>
                <button
                  onClick={() =>
                    addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="w-full bg-primary text-white py-2 px-4 rounded font-medium hover:opacity-90"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
