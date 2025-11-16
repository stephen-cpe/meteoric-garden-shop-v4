import React from "react";
import Header from "../components/Header";
import StyledShopName from "../components/StyledShopName";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="about" />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">
          About Us
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <p className="text-lg text-brown mb-4">
              Welcome to <StyledShopName />! We are passionate about bringing
              the beauty of nature into your life through our carefully crafted
              floral arrangements.
            </p>

            <p className="text-lg text-brown mb-4">
              Founded in 2001 by Shancai Wang, our studio has spent decades
              perfecting the art of floral design—sourcing the freshest blooms
              and creating unique pieces for every occasion.
            </p>

            <p className="text-lg text-brown">
              Meet our founder, whose vision and love for flowers continue to
              guide everything we do at <StyledShopName />.
            </p>
          </div>

          <div className="md:w-1/2">
            <img
              src="/about.png"
              alt="Our founder, Shancai Wang"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;