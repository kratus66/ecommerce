import { useState, useEffect } from "react";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Obtener el userId desde el localStorage

        if (!userId) {
          throw new Error("Usuario no autenticado");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders?userId=${userId}`, {
          method: "GET",
          headers: {
            Authorization: ` ${token}`, // Usa 'Bearer' para la autenticación
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las órdenes");
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  if (error) {
    return <div>Error al cargar las órdenes: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No hay órdenes disponibles.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Mis Órdenes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4 border-b font-semibold">ID</th>
              <th className="py-3 px-4 border-b font-semibold">Estado</th>
              <th className="py-3 px-4 border-b font-semibold">Fecha</th>
              <th className="py-3 px-4 border-b font-semibold">Productos</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">{new Date(order.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.id}>
                        {product.name} - Cantidad: {product.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
