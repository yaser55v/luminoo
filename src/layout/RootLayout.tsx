import { Outlet } from 'react-router-dom';
import { Navbar } from '@/layout/navbar';
import { Footer } from '@/layout/Footer';

export const RootLayout = () => {
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