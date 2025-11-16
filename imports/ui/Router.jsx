import React, { useState, useEffect } from 'react';

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
    // Listen for URL changes
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  // Find the component to render
  // We use "routes['*']" as the 404 fallback 
  const CurrentPage = routes[currentPath] || routes['*'];

  return <CurrentPage />;
};