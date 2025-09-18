import CartHeader from "./parts/CartHeader";
import { CartActions } from "./parts/CartActions";
import CartItemsList from "./parts/CartItemsList";
import CartSummary from "./parts/CartSummary";
import useCart from "../../hooks/useCart";

const SideCart = () => {
  return (
    <aside
      className={`sm:min-w-[350px] sticky top-0 h-screen left-0 h-full w-full bg-gray-100 max-h-screen lg:max-w-[450px] flex justify-between px-2 py-4 flex-col transform transition-transform duration-300 z-40 translate-x-0 `}
    >
      <CartHeader />
      <div className="flex-1 overflow-auto">
        <CartItemsList />
      </div>
      <CartSummary />
      <CartActions />
    </aside>
  );
};

export default SideCart;
