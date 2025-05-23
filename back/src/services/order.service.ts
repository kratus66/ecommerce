import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";


import { OrderProductRepository } from "../repositories/orderProduct.repository";

export const createOrderService = async (createOrderDto: CreateOrderDto): Promise<Order> => {
  try {
    const userF = await UserRepository.findOneBy({ id: createOrderDto.userId });
    if (!userF) throw new Error("User not found");

    const newOrder = OrderRepository.create();
    newOrder.status = createOrderDto.isPurchase ? "comprado" : "agregado al carrito";
    newOrder.date = new Date();
    newOrder.user = userF;

    await OrderRepository.save(newOrder); // Guardar la orden primero

    // Crear las relaciones en OrderProduct con las cantidades
    for await (const { id, quantity } of createOrderDto.products) {
      if (!quantity) {
        throw new Error(`La cantidad para el producto con id ${id} no es válida`);
      }

      const product = await ProductRepository.findOneBy({ id });
      if (!product) throw new Error("Product not found");

      const orderProduct = OrderProductRepository.create();
      orderProduct.order = newOrder;
      orderProduct.product = product;
      orderProduct.quantity = quantity;

      console.log(`Producto añadido: ${product.name} con cantidad ${quantity}`); // Log para depuración

      await OrderProductRepository.save(orderProduct); // Guardar la relación en la tabla intermedia
    }

    return newOrder;

  } catch (error) {
    console.error("Error en createOrderService:", error); // Captura el error en detalle
    throw error; // Re-lanzamos el error para que sea capturado en el controlador
  }
};










export const getUserOrdersService = async (userId: number) => {
  return await OrderRepository.find({
    where: { user: { id: userId } },
    relations: ["orderProducts", "orderProducts.product"], // Asegúrate de incluir las relaciones necesarias
  });
};
  


