import { Request, Response } from "express";
import { createOrderService } from "../services/order.service";
import { catchedController } from "../utils/catchedController";
import { getUserOrdersService } from "../services/order.service";

export const createOrder = catchedController(
  async (req: Request, res: Response) => {
    try {
      const { products } = req.body;
      const userId = req.body.userId;

      if (!products || products.length === 0) {
        return res.status(400).json({ message: 'No se han enviado productos para la orden' });
      }

      const newOrder = await createOrderService({ userId, products });
      return res.status(201).json(newOrder);

    } catch (error) {
      console.error("Error al crear la orden:", error); // Esto capturará el error exacto
      return res.status(500).json({ message: "Error interno al crear la orden" });
    }
  }
);






export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;  // Cambiar a req.query.userId
    if (!userId) {
      return res.status(400).json({ message: "No se proporcionó el userId" });
    }

    const orders = await getUserOrdersService(parseInt(userId as string));
    
    // Asegurarse de que cada orden tenga un array de productos
    const ordersWithProducts = orders.map(order => ({
      ...order,
      products: order.orderProducts.map(orderProduct => ({
        id: orderProduct.product.id,
        name: orderProduct.product.name,
        quantity: orderProduct.quantity,
      })) || [] // Asignar un array vacío si no hay productos
    }));
    
    res.status(200).json(ordersWithProducts);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({ message: "Error interno al obtener las órdenes" });
  }
};




