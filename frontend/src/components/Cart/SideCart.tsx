import CartHeader from "./parts/CartHeader";
import { CartActions } from "./parts/CartActions";
import CartItemsList from "./parts/CartItemsList";
import CartSummary from "./parts/CartSummary";
import { Divider } from "@mui/material";
import useCart from "../../hooks/useCart";

const SideCart = () => {
  const { activeCart } = useCart();
  console.log("💀 ~ SideCart ~ activeCart:", activeCart)
  return (
    <aside
      className={`sm:min-w-[350px] sticky top-0 h-screen left-0  w-full bg-gray-100 max-h-screen lg:max-w-[450px] flex justify-between px-2 py-4 flex-col transform transition-transform duration-300 z-40 translate-x-0 `}
    >
      <CartHeader />
      <div className="flex-1 overflow-auto">
        <CartItemsList />
      </div>
      <CartSummary />
      <Divider />
      <CartActions id={activeCart} />
    </aside>
  );
};

export default SideCart;
