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
      <h2 className="text-3xl text-textDark pb-4">
        Produkty ({products.length ?? 0})
      </h2>
      <section className="grid gap-4  place-items-center justify-center sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] ">
        {products.map((p) => (
          <ProductItem product={p} key={p.id} />
        ))}
      </section>
    </div>
  );
};

export default ProductList;
