import { Outlet } from 'react-router-dom';
import { Navbar } from '@/layout/navbar';
import { Footer } from '@/layout/Footer';
import { useEffect } from 'react';

export const RootLayout = () => {
  useEffect(() => {
    // Remove any scroll locking classes/styles when component mounts
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.style.marginRight = '';
    
    return () => {
      // Cleanup when component unmounts
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.marginRight = '';
    };
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};