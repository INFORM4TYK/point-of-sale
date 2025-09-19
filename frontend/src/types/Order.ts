export type OrderItem = {
  id?: number;          
  order_id?: number;   
  product_id: number;
  amount: number;
  price: number;
};

export type Order = {
  id: number;
  customer_id: number | null;
  total: number;
  created_at: string;     
  items: OrderItem[];     
};