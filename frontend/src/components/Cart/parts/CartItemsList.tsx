import { Divider } from "@mui/material";
import useCart from "../../../hooks/useCart";
import CartItem from "./CartItem/CartItem";

const CartItemsList = () => {
  const { cart: products, activeCart } = useCart();
  return (
    <div className="space-y-2">
      {products?.length > 0 ? (
        products.map((product) => (
          <>
            <CartItem cartProduct={product} />
            <Divider />
          </>
        ))
      ) : (
        <>
          <div className="text-center h-[500px] grid place-items-center text-gray-500">
            <p>
              Koszyk <strong>{activeCart}</strong> jest pusty
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItemsList;
