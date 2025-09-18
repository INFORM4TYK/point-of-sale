export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating_rate: string;
  rating_count: number;
  stock: number;
}

export interface CartProduct extends Product {
  id: number;
  product_id: number;
  amount: number;
}
