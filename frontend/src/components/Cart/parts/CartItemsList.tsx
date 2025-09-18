import { useEffect, useState } from "react";
import useLoading from "../../../hooks/useLoading";
import CartItem from "./CartItem/CartItem";
import type { CartProduct } from "../../../types/Product";
import { Divider } from "@mui/material";
import { getCartItems } from "../../../services/cartService";

const CartItemsList = () => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const { startLoading } = useLoading();
  useEffect(() => {
    const stopLoading = startLoading();
    getCartItems()
      .then(setProducts)
      .finally(stopLoading);
  }, []);
  return (
    <div className="space-y-2">
      {products?.length > 0 &&
        products.map((product) => (
          <>
            <CartItem cartProduct={product} />
            <Divider />
          </>
        ))}
    </div>
  );
};

export default CartItemsList;
