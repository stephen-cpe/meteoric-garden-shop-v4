import React from 'react';
import Header from "../components/Header";
import { Link } from "../Router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl text-foreground mb-8">Page Not Found</p>
        <p className="text-lg text-foreground mb-8">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90">
          Go to Home
        </Link>
      </main>
    </div>
  );
}