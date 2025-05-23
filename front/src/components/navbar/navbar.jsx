import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaShoppingCart, FaBars } from 'react-icons/fa';  // Íconos del carrito y menú hamburguesa

function Navbar({ cartCount, setCartCount }) {
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);  // Estado para el menú desplegable
  const router = useRouter();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (token && storedUserName) {
      setUserName(storedUserName);
      setIsLoggedIn(true);
      setCartCount(storedCart.length); // Actualizar el contador del carrito
    } else {
      setUserName(null);
      setIsLoggedIn(false);
    }
  }, [setCartCount]);

  const handleLogout = () => {
    localStorage.clear(); // Limpiar todo el localStorage
    setUserName(null);
    setIsLoggedIn(false);
    setCartCount(0);
    router.push('/');  // Redirigir a la página principal al cerrar sesión
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alternar la visibilidad del menú
  };

  return (
    <nav className="bg-[#fcfafa] p-4 font-sans fixed w-full top-0 left-0 z-50 shadow-md">
    <div className="flex justify-between items-center mx-auto max-w-7xl">
      {/* Nombre de la tienda en el centro */}
      <div className="flex items-center space-x-8">
        <span className="text-[#e16a51] text-2xl font-nordic">TecnoShop</span>
        <ul className="hidden md:flex space-x-8 text-gray-500 font-mono">
          <li className="group">
            <Link href="/" className="hover:text-black">Home</Link>
          </li>
          <li className="group">
            <Link href="/about" className="hover:text-black">About</Link>
          </li>
          <li className="group">
            <Link href="/contact" className="hover:text-black">Contact Us</Link>
          </li>
          {/* Mostrar el Dashboard solo si el usuario está logueado */}
          {isLoggedIn && (
            <li className="group">
              <Link href="/dashboard" className="hover:text-black">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
  
      {/* Ícono de menú hamburguesa en pantallas pequeñas */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-500 hover:text-black">
          <FaBars size={28} />
        </button>
      </div>
  
      {/* Opciones a la derecha */}
      <ul className="hidden md:flex items-center space-x-6 text-gray-500 font-mono">
        {!isLoggedIn && (
          <>
            <li className="group">
              <Link href="/login" className="hover:text-black">Login</Link>
            </li>
            <li className="group">
              <Link href="/register" className="hover:text-black">Register</Link>
            </li>
          </>
        )}
  
        {isLoggedIn && userName && (
          <>
            <li className="text-gray-500">Bienvenido, {userName}</li>
            <li>
              <button onClick={handleLogout} className="hover:text-black">Cerrar Sesión</button>
            </li>
          </>
        )}
  
        {/* Ícono del carrito */}
        <li className="relative">
          <button
            onClick={() => router.push('/cart')}
            className="text-gray-500 hover:text-black flex items-center"
          >
            <FaShoppingCart size={28} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center transform translate-x-2 -translate-y-2">
                {cartCount}
              </span>
            )}
          </button>
        </li>
      </ul>
  
      {/* Menú desplegable en pantallas pequeñas */}
      {menuOpen && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-[#fcfafa] text-gray-500 font-mono space-y-4 p-4 z-50">
          <li>
            <Link href="/" className="hover:text-black" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-black" onClick={toggleMenu}>About</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-black" onClick={toggleMenu}>Contact Us</Link>
          </li>
          {/* Mostrar el Dashboard solo si el usuario está logueado */}
          {isLoggedIn && (
            <li>
              <Link href="/dashboard" className="hover:text-black" onClick={toggleMenu}>Dashboard</Link>
            </li>
          )}
          {!isLoggedIn ? (
            <>
              <li>
                <Link href="/login" className="hover:text-black" onClick={toggleMenu}>Login</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-black" onClick={toggleMenu}>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>Bienvenido, {userName}</li>
              <li>
                <button onClick={handleLogout} className="hover:text-black">Cerrar Sesión</button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  </nav>
  
  );
}

export default Navbar;
