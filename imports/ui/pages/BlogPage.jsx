import React from "react";
import Header from "../components/Header"
import { Link } from "../Router"

const blogPosts = [
  {
    id: 1,
    title: "The Art of Flower Arrangement",
    excerpt: "Learn the basics of creating beautiful flower arrangements.",
    date: "2024-11-15",
    category: "Tips & Tricks",
    image: "/flower-arrangement.jpg",
  },
  {
    id: 2,
    title: "Seasonal Flowers: What's Fresh Now",
    excerpt: "Discover which flowers are in season and why it matters.",
    date: "2024-11-10",
    category: "Seasonal",
    image: "/seasonal-flowers.jpg",
  },
  {
    id: 3,
    title: "Perfect Flowers for Every Occasion",
    excerpt: "A complete guide to choosing the right flowers for any event.",
    date: "2024-11-05",
    category: "Guide",
    image: "/occasion-flowers.jpg",
  },
  {
    id: 4,
    title: "Caring for Your Cut Flowers",
    excerpt: "Simple tips to keep your flower bouquets fresh and beautiful.",
    date: "2024-10-30",
    category: "Care Tips",
    image: "/flower-care.jpg",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="blog" />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Flower Blog</h1>
        <p className="text-center text-foreground mb-12 mx-auto">
          Discover tips, tricks, and inspiration for working with flowers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-secondary rounded-lg overflow-hidden hover:shadow-lg">
              <div className="h-48 w-full bg-gray-300">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded">
                    {post.category}
                  </span>
                  <span className="text-sm text-foreground/70">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-3">{post.title}</h2>
                <p className="text-foreground mb-4">{post.excerpt}</p>
                <Link to="#" className="text-primary font-semibold hover:underline">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
