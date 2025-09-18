import { Divider } from "@mui/material";
import useCart from "../../../hooks/useCart";
import CartItem from "./CartItem/CartItem";

const CartItemsList = () => {
  const { cart: products } = useCart();
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
