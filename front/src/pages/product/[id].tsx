'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';  // Botón para regresar al home
import Image from 'next/image';
import IProduct from "../../interface/IProduct";
import { FaShoppingCart } from 'react-icons/fa'; // Icono del carrito para el popup

function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Obtenemos el id dinámico desde la URL

  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [isPopupVisible, setPopupVisible] = useState(false); // Estado para el popup
  const [cartCount, setCartCount] = useState(0); // Contador del carrito

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información del producto");
        }
        const data: IProduct[] = await response.json();
        const foundProduct = data.find((product) => product.id === Number(id));
        if (!foundProduct) {
          throw new Error("Producto no encontrado");
        }
        setProduct(foundProduct);

        // Cargar el carrito del localStorage
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(existingCart.length);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

  const addToCart = (product: IProduct) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Por favor, inicia sesión para agregar productos al carrito.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = existingCart.find((item: IProduct) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      existingCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCartCount(existingCart.length);

    // Mostrar popup de éxito
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      window.location.reload(); // Recargar la página después de 2 segundos
    }, 2000);
  };

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </div>

      <Image 
        src={product.image} 
        alt={product.name} 
        width={500}  
        height={500} 
        className="rounded-lg mb-4"
      />

      <p className="text-lg font-semibold">Precio: ${product.price}</p>
      <p className="mt-4"><strong>Descripción:</strong> {product.description}</p>
      <p className="mt-2"><strong>Stock:</strong> {product.stock}</p>

      {/* Contenedor flex para botones */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => addToCart(product)} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Agregar al Carrito
        </button>

        {/* Botón para regresar al Home */}
        <Link href="/">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300">
            Volver al Home
          </button>
        </Link>
      </div>

      {/* Pop-up que aparece al agregar un producto */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg text-center animate-fade-in">
            <div className="relative flex items-center justify-center">
              <FaShoppingCart className="text-green-500 w-12 h-12 animate-move-to-cart" />
              <p className="text-lg font-semibold mt-4">Producto agregado exitosamente</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
