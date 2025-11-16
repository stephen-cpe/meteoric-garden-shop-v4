"use client"

import React, { useState } from "react"
import Header from "../components/Header"
import { ChevronDown } from "lucide-react"

const faqItems = [
  {
    id: 1,
    question: "How fresh are your flowers?",
    answer: "All of our flowers are sourced daily from trusted suppliers and arranged fresh.",
  },
  {
    id: 2,
    question: "Do you offer same-day delivery?",
    answer: "Yes! Orders placed before 2 PM are eligible for same-day delivery in our service area.",
  },
  {
    id: 3,
    question: "Can I customize a bouquet?",
    answer: "Yes, we'd be happy to create a custom bouquet for you. Please call our shop to discuss your needs.",
  },
  {
    id: 4,
    question: "What areas do you deliver to?",
    answer: "We deliver to all areas within 15 miles of our shop location.",
  },
  {
    id: 5,
    question: "How long will the flowers last?",
    answer: "With proper care, most of our arrangements will last 7-10 days.",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, online banking, PayPal, and Google Pay.",
  },
  {
    id: 7,
    question: "Can I schedule a delivery for a future date?",
    answer: "Yes! During checkout, you can select any date up to 30 days in advance.",
  },
  {
    id: 8,
    question: "Do you offer corporate/bulk orders?",
    answer: "Yes, we specialize in corporate arrangements and bulk orders.",
  },
]

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="faq" /> 

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-center text-foreground mb-12">
          Find answers to common questions about our flowers, delivery, and services.
        </p>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <div key={item.id} className="border-2 border-secondary rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary"
              >
                <h3 className="text-lg font-semibold text-foreground text-left">{item.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                    expandedId === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedId === item.id && (
                <div className="px-4 pb-4 bg-secondary">
                  <p className="text-foreground">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
