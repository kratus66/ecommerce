// src/components/Layout.js
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/Footer';
import { useState } from "react";
import { Children } from 'react';


function Layout({ children }) {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} setCartCount={setCartCount} />
      <main className="flex-grow">
        {children} {/* Renderiza los elementos hijos aquí */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
