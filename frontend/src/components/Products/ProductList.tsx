import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import { getProducts, searchProducts } from "../../services/productService";
import ProductItem from "./ProductItem";
import ProductSearch from "./ProductSearch";
import ProductListNotFound from "./parts/ProductListNotFound";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim() === "") {
        setFilteredProducts(products);
      } else {
        try {
          setCategory("");

          const searched = await searchProducts(query);
          setFilteredProducts(searched);
        } catch (err) {
          console.error(err);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [query, products]);
  useEffect(() => {
    if (!category) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.category === category);
      setFilteredProducts(filtered);
    }
  }, [category, products]);
  return (
    <div>
      <h2 className="text-3xl text-textDark pb-4">
        Produkty ({products.length ?? 0})
      </h2>
      <ProductSearch
        query={query}
        setQuery={setQuery}
        setCategory={setCategory}
        category={category}
      />
      {filteredProducts.length > 0 ? (
        <section className="grid gap-4  sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          {filteredProducts.map((p) => (
            <ProductItem product={p} />
          ))}
        </section>
      ) : (
        <ProductListNotFound query={query} />
      )}
    </div>
  );
};

export default ProductList;
