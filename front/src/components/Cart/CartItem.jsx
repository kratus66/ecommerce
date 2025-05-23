import { useState } from 'react';

const CartItem = ({ product, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const priceWithIVA = product.price * 1.2;  // Precio con IVA

  const handleQuantityChange = (e) => {
    const selectedQuantity = Number(e.target.value);
    setQuantity(selectedQuantity);
    onQuantityChange(product.id, selectedQuantity); // Notificar al carrito el cambio
  };

  const handleRemove = () => {
    onRemove(product.id);  // Llamar a la función para eliminar el producto
  };

  return (
    <div className="cart-item flex items-center justify-between border rounded-lg shadow-md p-4 hover:shadow-lg mb-4">
      <div className="product-image flex-shrink-0">
        <img src={product.image} alt={product.name} className="w-24 h-24 rounded" />
      </div>

      <div className="product-info flex-1 pl-4">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p>Stock disponible: {product.stock}</p>
        <p>Precio unitario: ${product.price}</p>

        <label htmlFor="quantity">Cantidad:</label>
        <select
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="ml-2 p-2 border rounded"
        >
          {Array.from({ length: product.stock }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="product-price flex-shrink-0">
        <p className="font-semibold">Precio total: ${(product.price * quantity).toFixed(2)}</p>
        <p className="text-sm">IVA (20%): ${((priceWithIVA - product.price) * quantity).toFixed(2)}</p>
        <p className="font-bold text-xl">Total: ${(priceWithIVA * quantity).toFixed(2)}</p>
      </div>

      {/* Botón para eliminar el producto */}
      <button onClick={handleRemove} className="text-white bg-red-600 rounded-lg p-2">
        X
      </button>
    </div>
  );
};

export default CartItem;
