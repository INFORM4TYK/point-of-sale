import { useEffect, useState } from "react";
import useLoading from "../../../hooks/useLoading";
import CartItem from "./CartItem/CartItem";
import type { Product } from "../../../types/Product";
import { getProducts } from "../../../services/productService";
import { Divider } from "@mui/material";

const CartItemsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { startLoading } = useLoading();
  useEffect(() => {
    const stopLoading = startLoading();
    getProducts().then(setProducts).finally(stopLoading);
  }, []);
  return (
    <div className="space-y-2">
      {products.map((product) => {
        return (
          <>
            <CartItem product={product} />
            <Divider />
          </>
        );
      })}
    </div>
  );
};

export default CartItemsList;
