import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      <footer className="bg-primary-blue text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-80">© {new Date().getFullYear()} TekRise Test Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
