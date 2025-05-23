import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity({ name: "order_products" })
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: "productId" })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: "orderId" })
  order: Order;
}




