import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import { getProducts } from "../../services/productService";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  console.log("💀 ~ ProductList ~ products:", products);
  return (
    <div>
      <h2>Produkty</h2>
      {products.map((p) => (
        <ProductItem product={p} key={p.id} />
      ))}
    </div>
  );
};

export default ProductList;
