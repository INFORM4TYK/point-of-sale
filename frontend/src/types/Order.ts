import type { Product } from "./Product";

export type OrderItem = {
  id?: number;
  order_id?: number;
  product_id: number;
  amount: number;
  price: number;
};
export interface OrderItemEnriched extends Product {
  order_id?: number;
  product_id: number;
  amount: number;
  price: number;
}

export type Order = {
  id: number;
  customer_id: number | null;
  total: string;
  created_at: string;
  items: OrderItemEnriched[];
  status: 'paid' | 'unpaid'
};
