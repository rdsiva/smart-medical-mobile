import React, { useState, useEffect } from 'react';
import SideNavigation from './SideNavigation';
import BottomNavigation from './BottomNavigation';

const Navigation = ({ activeItem }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <SideNavigation activeItem={activeItem} />
      {isMobile && <BottomNavigation activeItem={activeItem} />}
    </>
  );
};

export default Navigation;