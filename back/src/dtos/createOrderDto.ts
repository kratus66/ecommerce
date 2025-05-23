export interface CreateOrderDto {
  userId: number;
  
  products: { id: number; quantity: number }[];
  isPurchase?: boolean;
  
}
