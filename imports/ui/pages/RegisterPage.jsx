"use client"

import React, { useState } from "react"
import { navigate, Link } from "../Router"
import { Meteor } from "meteor/meteor"
import Header from "../components/Header"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await new Promise((resolve, reject) => {
        Meteor.call(
          "users.register",
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName,
          (err) => {
            if (err) reject(err)
            else {
              Meteor.loginWithPassword(formData.email, formData.password, (loginErr) => {
                if (loginErr) reject(loginErr)
                else resolve()
              })
            }
          },
        )
      })
      navigate("/account")
    } catch (err) {
      setError(err.reason || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="home" />

      <main className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full p-3 border-2 border-secondary rounded-lg focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full p-3 border-2 border-secondary rounded-lg focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full p-3 border-2 border-secondary rounded-lg focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 border-2 border-secondary rounded-lg focus:border-primary focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in here
          </Link>
        </p>
      </main>
    </div>
  )
}
