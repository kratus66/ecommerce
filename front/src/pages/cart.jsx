import { useState, useEffect } from 'react';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';

const Cart = ({ onPurchase }) => {
  const [cart, setCart] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Actualiza el carrito en localStorage
  };

  const handleRemoveProduct = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleConfirmPurchase = async (newOrder) => {
    setPurchasedProducts([...purchasedProducts, ...cart]); // Mover al estado de productos comprados
    setCart([]); // Vaciar el carrito
    localStorage.removeItem('cart'); // Eliminar carrito del localStorage

    // Llamar a la función pasada como prop para informar al Dashboard
    if (onPurchase) {
      onPurchase(newOrder); // Actualizar el estado en el Dashboard
    }

    // Mostrar mensaje de éxito y limpiar el de error
    setConfirmationMessage('Pedido confirmado exitosamente.');
    setErrorMessage(''); // Limpiar cualquier mensaje de error anterior

    // Esperar 2 segundos antes de recargar la página
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="pt-20 px-4 lg:px-8"> {/* Ajustamos el padding-top para que no sea tapado por el navbar */}
      <div className="flex flex-col lg:flex-row lg:space-x-8"> {/* Responsive design */}
        <div className="lg:w-3/5 w-full mb-8 lg:mb-0"> {/* Ajustamos a 60% en pantallas grandes */}
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveProduct}
              />
            ))
          ) : (
            <p>Tu carrito está vacío.</p>
          )}
        </div>

        <div className="lg:w-2/5 w-full"> {/* Ajustamos a 40% en pantallas grandes */}
          <CartSummary products={cart} onPurchaseConfirm={handleConfirmPurchase} />
        </div>
      </div>

      {/* Mostrar mensaje de confirmación o error */}
      {confirmationMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          {confirmationMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Cart;
