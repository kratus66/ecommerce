import { useState } from 'react';

const CartSummary = ({ products = [], onPurchaseConfirm }) => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const calculateTotal = () => {
    return products.reduce((acc, product) => {
      const priceWithIVA = product.price * 1.2;
      return acc + priceWithIVA * product.quantity;
    }, 0);
  };
  const handleConfirmPurchase = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');  // Asegúrate de obtener el userId desde localStorage
  
      if (!token || !userId) {  // Verifica que tanto el token como el userId estén disponibles
        alert('Debes iniciar sesión para confirmar el pedido.');
        return;
      }
  
      const orderData = {
        userId,  // Añade el userId al payload de la solicitud
        products: products.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          Authorization: ` ${token}`,  // Usa el token correctamente
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),  // Envía el cuerpo de la solicitud
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de confirmación:', errorData);
        throw new Error(`Error al confirmar el pedido: ${errorData.message || 'Error desconocido'}`);
      }
  
      const newOrder = await response.json();
      console.log("Pedido confirmado:", newOrder);
  
      // Llamar al callback para confirmar la compra
      onPurchaseConfirm(newOrder);
  
      setConfirmationMessage("Pedido confirmado exitosamente.");
    } catch (error) {
      console.error('Error al confirmar el pedido:', error);
      setErrorMessage('Hubo un error al confirmar tu pedido.');
    }
  };
  

  return (
    <div className="cart-summary w-2/5 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Resumen de la compra</h3>
      {products.length > 0 ? (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-2">Producto</th>
              <th className="pb-2">Cantidad</th>
              <th className="pb-2">Precio unitario + IVA</th>
              <th className="pb-2">Precio total + IVA</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const priceWithIVA = product.price * 1.2;
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${priceWithIVA.toFixed(2)}</td>
                  <td>${(priceWithIVA * product.quantity).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}

      <hr className="my-4" />

      <p className="text-lg font-bold">Total: ${calculateTotal().toFixed(2)}</p>

      {products.length > 0 && (
        <button
          onClick={handleConfirmPurchase}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg w-full hover:bg-green-700"
        >
          Confirmar compra
        </button>
      )}

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

export default CartSummary;
