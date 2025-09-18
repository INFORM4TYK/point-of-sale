import { useState } from "react";
import CartHeader from "./parts/CartHeader";
import { CartActions } from "./parts/CartActions";
import CartItemsList from "./parts/CartItemsList";
import CartSummary from "./parts/CartSummary";
const SideCart = () => {
  const [open, setOpen] = useState();
  return (
    <div
      className={` fixed top-0  left-0 h-full w-[450px] border-s-2 bg-gray-100  flex flex-col justify-between transform transition-transform duration-300 z-40 ${
        open ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0 sm:relative`}
    >
      <CartHeader />
      <div className="flex-1 overflow-auto">
        <CartItemsList />
      </div>
      <CartSummary />
      <CartActions />
    </div>
  );
};

export default SideCart;
