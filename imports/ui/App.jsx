import React, { Suspense } from "react";
import { Router } from "./Router"; 

// Create a loading component
const Loading = () => <div className="flex justify-center items-center h-screen">Loading...</div>;

const lazyLoad = (importFunc) => {
  const Component = React.lazy(importFunc);
  return () => (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

const routes = {
  '/': lazyLoad(() => import("./pages/HomePage")),
  '/shop': lazyLoad(() => import("./pages/ShopPage")),
  '/gallery': lazyLoad(() => import("./pages/GalleryPage")),
  '/login': lazyLoad(() => import("./pages/LoginPage")),
  '/register': lazyLoad(() => import("./pages/RegisterPage")),
  '/checkout': lazyLoad(() => import("./pages/CheckoutPage")),
  '/account': lazyLoad(() => import("./pages/AccountPage")),
  '/admin/dashboard': lazyLoad(() => import("./pages/AdminDashboardPage")),
  '/blog': lazyLoad(() => import("./pages/BlogPage")),
  '/faq': lazyLoad(() => import("./pages/FAQPage")),
  
  '/order-complete': lazyLoad(() => import("./pages/OrderCompletePage")),
  '/about': lazyLoad(() => import("./pages/AboutPage")),
  '*': lazyLoad(() => import("./pages/NotFoundPage")), 
};

export default function App() {
  return (
    <Router routes={routes} />
  )
}