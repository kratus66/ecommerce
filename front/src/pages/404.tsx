import Link from 'next/link';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Image
        src="/imagen404.png" // Asegúrate de colocar la imagen en la carpeta public con el nombre correcto
        alt="404 Error"
        width={600}
        height={400}
        className="object-contain"
      />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 mt-8">
        404 - Página no encontrada
      </h1>
      <p className="text-lg md:text-xl text-gray-500 mt-4 mb-8 text-center">
        Parece que te has perdido. La página que estás buscando no existe.
      </p>
      <Link href="/">
        <span className="px-6 py-3 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition cursor-pointer">
          Volver al inicio
        </span>
      </Link>
    </div>
  );
};

export default Custom404;
