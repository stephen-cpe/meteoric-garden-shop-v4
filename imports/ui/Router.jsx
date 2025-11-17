import React, { useState, useEffect, Suspense } from 'react';

const AdminLoginPage = React.lazy(() => import('./pages/AdminLoginPage'));
const AdminOrdersPage = React.lazy(() => import('./pages/AdminOrdersPage'));
const AdminOrderDetailPage = React.lazy(() => import('./pages/AdminOrderDetailPage'));

export const navigate = (to) => {
  // Change the URL
  window.history.pushState({}, '', to);
  // Notify the Router that the URL has changed
  const navigationEvent = new PopStateEvent('popstate');
  window.dispatchEvent(navigationEvent);
};

// Custom Link component 
export const Link = ({ to, children, className }) => {
  const onClick = (event) => {
    // Don't do a full page reload
    event.preventDefault();
    // Use our new navigate helper
    navigate(to);
  };

  return (
    <a href={to} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

// Custom Router component 
export const Router = ({ routes }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  useEffect(() => {
    if (currentPath === '/admin' || currentPath === '/admin/') {
       navigate('/admin/dashboard');
    }
  }, [currentPath]);


  let CurrentPage = routes[currentPath];


  if (!CurrentPage) {
    // Check if accessing admin routes
    if (currentPath.startsWith('/admin')) {
      const isAdminAuth = sessionStorage.getItem('adminAuth') === 'true';
      if (!isAdminAuth) {
        CurrentPage = AdminLoginPage;
      }
      else if (currentPath === '/admin' || currentPath === '/admin/') {
        return null;
      }
      else if (currentPath.startsWith('/admin/orders/') && currentPath.split('/').length === 4) {
        CurrentPage = AdminOrderDetailPage;
      }
      else if (currentPath === '/admin/orders') {
        CurrentPage = AdminOrdersPage;
      }
    }
  }
  
  // Fallback to 404
  if (!CurrentPage) {
    CurrentPage = routes['*'];
  }

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <CurrentPage />
    </Suspense>
  );
};