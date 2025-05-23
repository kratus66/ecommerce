import React, { useRef } from 'react'; 
 import GetProducts from "../components/GetProducts/getProducts";
import Image from 'next/image'; 

function LandingPage() {
  const productsRef = useRef(null); // Crear una referencia para GetProducts

  const handleCartUpdate = (count) => {
    console.log(`El carrito ahora tiene ${count} productos.`);
  };

  // Función para hacer scroll hasta GetProducts
  const handleShopNowClick = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
    }
  };

  return (
    <div>
      <div style={{height:110}}></div>
      <main className="pt-20">
        {/* Sección de bienvenida con la imagen centrada */}
        <div className="relative flex justify-center items-center h-[200px] md:h-[300px] lg:h-[400px] mx-auto" style={{ maxWidth: '600px' }}>
          <Image
            src="/imagenInicio2.png"
            alt="Imagen de Entrada"
            layout="intrinsic"
            width={600}
            height={300}
            className="object-contain"
          />
          {/* Botón en el centro de la imagen */}
          <button
            className="absolute bg-red-600 text-white px-6 py-3 rounded-full text-lg md:text-xl lg:text-2xl hover:bg-red-700"
            onClick={handleShopNowClick} // Agregar el evento onClick
          >
            Shop Now..!
          </button>
        </div>

        <p className="text-center text-lg md:text-xl lg:text-2xl mt-8">Explora los mejores productos aquí.</p>
        
        {/* Sección GetProducts */}
        <div ref={productsRef} className="mt-12 px-4 lg:px-20"> {/* Añadir la referencia */}
          <GetProducts onCartUpdate={handleCartUpdate} />
        </div>
      </main>
    </div>
  );
}

export default LandingPage;

