"use client"

import React from "react"
import Header from "../components/Header"
import { Carousel } from "flowbite-react"

const galleryImages = [
  { src: "/gallery-1.jpeg", alt: "Gallery Image 1" },
  { src: "/gallery-2.jpeg", alt: "Gallery Image 2" },
  { src: "/gallery-3.jpeg", alt: "Gallery Image 3" },
  { src: "/gallery-4.jpeg", alt: "Gallery Image 4" },
  { src: "/gallery-5.jpeg", alt: "Gallery Image 5" },
  { src: "/gallery-6.jpeg", alt: "Gallery Image 6" },
  { src: "/gallery-7.jpeg", alt: "Gallery Image 7" },
  { src: "/gallery-8.jpeg", alt: "Gallery Image 8" },
  { src: "/gallery-9.jpeg", alt: "Gallery Image 9" },
  { src: "/gallery-10.jpeg", alt: "Gallery Image 10" },
  { src: "/gallery-11.jpeg", alt: "Gallery Image 11" },
  { src: "/gallery-12.jpeg", alt: "Gallery Image 12" },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="gallery" />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Gallery</h1>
        <p className="text-center text-foreground mb-12">
          A collection of our beautiful floral arrangements and designs.
        </p>

        <div className="aspect-video rounded-lg overflow-hidden">
          <Carousel>
            {galleryImages.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.alt}
              />
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  )
}
