import React from "react";
import { Carousel } from "flowbite-react";
import Header from "../components/Header";
import StyledShopName from "../components/StyledShopName";

const HomePage = () => {
  const heroImages = [
    { src: "/a_flower_shop_customers_16x9_1.jpeg", alt: "Customers Photo 1" },
    { src: "/a_flower_shop_customers_16x9_2.jpeg", alt: "Customers Photo 2" },
    { src: "/a_fresh_festive_designs_of_flowers_2.jpeg", alt: "Flower Festive Design" },
  ];
  const specialImages = [
    { src: "/special-shop_interior_square_1.jpeg", alt: "Shop Interior 1" },
    { src: "/special-shop_interior_square_2.jpeg", alt: "Shop Interior 2" },
    { src: "/special-a_behind_the_scenes_photo_square_1.jpeg", alt: "Behind The Scenes 1" },
    { src: "/special-shop_interior_square_4.jpeg", alt: "Shop Interior 3" },
    { src: "/special_shop_customers_square_2.jpeg", alt: "Customers Photo 3" },
    { src: "/special-shop_customers_square_1.jpeg", alt: "Customers Photo 4" },
  ];
  const features = [
    {
      title: "Fresh Flowers Daily",
      description: "We source the freshest flowers daily to ensure your arrangements are vibrant and long-lasting at Meteoric Garden Shop."
    },
    {
      title: "Expert Florists",
      description: "Our skilled florists at Meteoric Garden Shop create beautiful arrangements with attention to detail and artistic flair."
    },
    {
      title: "On-Time Delivery",
      description: "We guarantee timely delivery for all occasions, ensuring your flowers from Meteoric Garden Shop arrive fresh and beautiful."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="home" />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="py-3 text-center">
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">
            Welcome To <StyledShopName />!
          </h1>
          <p className="text-lg text-brown mx-auto mb-8">
            Experience the beauty and elegance of our handcrafted floral arrangements at <StyledShopName />,
            created with the finest flowers and delivered with care.
          </p>
        </section>

        <section className="py-3 max-w-3xl mx-auto">
          <div className="aspect-video rounded-lg overflow-hidden">
            <Carousel>
              {heroImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              ))}
            </Carousel>
          </div>
        </section>

        {/* Special Features Section */}
        <section className="py-3 text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8">What Makes Us Special</h2>

          <div className="max-w-2xl mx-auto">
            <div className="aspect-square rounded-lg overflow-hidden">
              <Carousel>
                {specialImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                ))}
              </Carousel>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6">
                <h3 className="text-xl font-semibold text-brown mb-3">{feature.title}</h3>
                <p className="text-brown/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;