import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Icono del carrito para la animación
import PopUp from "./PopUp";

const AddToCartPopup = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Duración de 2 segundos

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return isVisible ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg text-center animate-fade-in">
        <div className="relative flex items-center justify-center">
          {/* Icono de producto moviéndose */}
          <FaShoppingCart className="text-green-500 w-12 h-12 animate-move-to-cart" />
          <p className="text-lg font-semibold mt-4">Producto agregado exitosamente</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddToCartPopup;
