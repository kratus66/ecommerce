function UserPurchases() {
    const [purchases, setPurchases] = useState([]);
  
    useEffect(() => {
      // Simulación de obtener las compras del usuario
      const userPurchases = JSON.parse(localStorage.getItem('userPurchases')) || [];
      setPurchases(userPurchases);
    }, []);
  
    if (purchases.length === 0) {
      return <p>No has realizado ninguna compra aún.</p>;
    }
  
    return (
      <div className="user-purchases">
        <h2>Tus Compras</h2>
        <ul>
          {purchases.map((purchase, index) => (
            <li key={index}>
              <p><strong>Producto:</strong> {purchase.productName}</p>
              <p><strong>Cantidad:</strong> {purchase.quantity}</p>
              <p><strong>Total:</strong> ${purchase.total}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default UserPurchases;
  