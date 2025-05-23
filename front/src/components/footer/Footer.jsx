import { PhoneIcon, ChatBubbleLeftIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#fcfafa] text-gray-500 p-6 font-sans">
      {/* Línea de puntos superior */}
      <div className="border-t-2 border-dotted border-gray-300 w-full mt-5"></div>

      <div>
        <h3 className="font-semibold mt-2 text-center text-gray-500">CANALES DE ATENCIÓN</h3>
      </div>

      {/* Contenedor de íconos y texto */}
      <div className="flex justify-around items-center mt-6">
        
        {/* Línea de atención */}
        <div className="flex flex-col items-center text-center">
          <PhoneIcon className="h-8 w-8 text-[#e16a51] mb-2" />
          <p className="text-black">+57 xxx xxxxxxx</p>
          <p className="text-gray-500">Línea de atención</p>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col items-center text-center">
          <ChatBubbleLeftIcon className="h-8 w-8 text-[#e16a51] mb-2" />
          <p className="text-black">+57 xxx xxxxxxxxx</p>
          <p className="text-gray-500">WhatsApp</p>
        </div>

        {/* Mensajes de texto */}
        <div className="flex flex-col items-center text-center">
          <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-[#e16a51] mb-2" />
          <p className="text-black">Mensajes de texto</p>
          <p className="text-gray-500">SMS</p>
        </div>
      </div>

      {/* Línea intermedia */}
      <div className="border-t-2 border-dotted border-gray-300 w-full mt-5"></div>

      {/* Redes Sociales */}
      <div>
        <h3 className="font-semibold mt-2 text-center text-gray-500">REDES SOCIALES</h3>
      </div>
      <div className="flex justify-center items-center mt-6 space-x-28 mb-4">
        <FaFacebookF className="h-8 w-8 text-gray-500 hover:text-black transition-colors" />
        <FaInstagram className="h-8 w-8 text-gray-500 hover:text-black transition-colors" />
        <FaTwitter className="h-8 w-8 text-gray-500 hover:text-black transition-colors" />
        <FaYoutube className="h-8 w-8 text-gray-500 hover:text-black transition-colors" />
      </div>

      {/* Línea de puntos inferior con margen inferior ajustado */}
      <div className="border-t-2 border-dotted border-gray-300 w-full mb-8"></div>
    </footer>
  );
};

export default Footer;
