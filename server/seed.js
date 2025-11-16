import { Meteor } from "meteor/meteor"
import { Categories, Products } from "../imports/api/collections"
import { Accounts } from "meteor/accounts-base"

Meteor.startup(async () => {
  // Only seed if collections are empty
  if (await Categories.find().countAsync() === 0) {
    console.log("Seeding database with initial data...")

    // Seed categories
    const categoryIds = {}
    const categories = [
      { name: "Seasonal", description: "Seasonal flower arrangements" },
      { name: "Romance", description: "Romantic bouquets and arrangements" },
      { name: "Mixed", description: "Mixed flower arrangements" },
      { name: "Premium", description: "Premium luxury arrangements" },
    ]

    for (const cat of categories) {
      const id = await Categories.insertAsync({
        name: cat.name,
        description: cat.description,
        createdAt: new Date(),
      })
      categoryIds[cat.name] = id
    }

    // Seed products
    const productData = [
      {
        name: "Spring Bouquet",
        description: "Beautiful spring flowers",
        price: "45.00",
        categoryId: categoryIds.Seasonal,
        image: "/bouquet_square_1.jpeg",
        stock_quantity: 15,
        sku: "SB-001",
      },
      {
        name: "Romantic Rose",
        description: "Dozen red roses",
        price: "50.00",
        categoryId: categoryIds.Romance,
        image: "/bouquet_square_2.jpeg",
        stock_quantity: 20,
        sku: "RR-001",
      },
      {
        name: "Sunflower Delight",
        description: "Bright sunflowers",
        price: "40.00",
        categoryId: categoryIds.Seasonal,
        image: "/bouquet_square_3.jpeg",
        stock_quantity: 12,
        sku: "SD-001",
      },
      {
        name: "Mixed Garden",
        description: "Garden variety mix",
        price: "55.00",
        categoryId: categoryIds.Mixed,
        image: "bouquet_square_4.jpeg",
        stock_quantity: 18,
        sku: "MG-001",
      },
      {
        name: "Elegant Orchid",
        description: "Premium orchid arrangement",
        price: "60.00",
        categoryId: categoryIds.Premium,
        image: "/bouquet_square_5.jpeg",
        stock_quantity: 8,
        sku: "EO-001",
      },
      {
        name: "Wildflower Mix",
        description: "Wildflower arrangement",
        price: "35.00",
        categoryId: categoryIds.Mixed,
        image: "/bouquet_square_6.jpeg",
        stock_quantity: 25,
        sku: "WF-001",
      },
      {
        name: "Tulip Collection",
        description: "Vibrant tulips",
        price: "48.00",
        categoryId: categoryIds.Seasonal,
        image: "/bouquet_square_7.jpeg",
        stock_quantity: 4,
        sku: "TC-001",
      },
      {
        name: "Summer Special",
        description: "Summer flowers",
        price: "52.00",
        categoryId: categoryIds.Seasonal,
        image: "/bouquet_square_8.jpeg",
        stock_quantity: 10,
        sku: "SS-001",
      },
      {
        name: "Deluxe Arrangement",
        description: "Luxury arrangement",
        price: "75.00",
        categoryId: categoryIds.Premium,
        image: "/flower-arrangements.jpg",
        stock_quantity: 5,
        sku: "DA-001",
      },
      {
        name: "Simple Elegance",
        description: "Elegant simple arrangement",
        price: "42.00",
        categoryId: categoryIds.Mixed,
        image: "/bouquet_square_11.jpeg",
        stock_quantity: 16,
        sku: "SE-001",
      },
      {
        name: "Pastel Paradise",
        description: "Soft pastel flowers",
        price: "47.00",
        categoryId: categoryIds.Romance,
        image: "/seasonal-flowers.jpg",
        stock_quantity: 11,
        sku: "PP-001",
      },
      {
        name: "Vibrant Choice",
        description: "Vibrant colors",
        price: "53.00",
        categoryId: categoryIds.Mixed,
        image: "/occasion-flowers.jpg",
        stock_quantity: 9,
        sku: "VC-001",
      },
      {
        name: "Classic Beauty",
        description: "Classic arrangement",
        price: "49.00",
        categoryId: categoryIds.Romance,
        image: "/bouquet_square_9.jpeg",
        stock_quantity: 13,
        sku: "CB-001",
      },
      {
        name: "Modern Mix",
        description: "Modern arrangement",
        price: "58.00",
        categoryId: categoryIds.Premium,
        image: "/flower-bouquets.jpg",
        stock_quantity: 7,
        sku: "MM-001",
      },
      {
        name: "Fresh & Bright",
        description: "Fresh bright flowers",
        price: "44.00",
        categoryId: categoryIds.Seasonal,
        image: "/flower-arrangements.jpg",
        stock_quantity: 17,
        sku: "FB-001",
      },
      {
        name: "Luxury Collection",
        description: "Premium luxury",
        price: "65.00",
        categoryId: categoryIds.Premium,
        image: "/bouquet_square_10.jpeg",
        stock_quantity: 6,
        sku: "LC-001",
      },
    ]

    for (const prod of productData) {
      await Products.insertAsync({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        categoryId: prod.categoryId,
        image: prod.image,
        stock_quantity: prod.stock_quantity,
        sku: prod.sku,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    console.log("Database seeded successfully!")
  }

  // Check for admin user
  const adminUser = await Meteor.users.findOneAsync({ emails: { $elemMatch: { address: "admin@mgshop.com" } } })
  if (!adminUser) {
    const adminId = Accounts.createUser({
      email: "admin@mgshop.com",
      password: "admin123",
      profile: {
        firstName: "Admin",
        lastName: "User",
      },
    })
    await Meteor.users.updateAsync(adminId, { $set: { isAdmin: true } })
    console.log("Admin user created: admin@mgshop.com / admin123")
  }
})
