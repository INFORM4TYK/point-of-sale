import useCart from "../../../hooks/useCart";

const CartHeader = () => {
  const { cart } = useCart();
  return (
    <div className="px-2 py-4 flex justify-between items-end">
      <h2 className="text-2xl font-semibold">Aktualne zamówienie</h2>
      <h2 className="font-semibold">Ilość: {cart.length ?? 0}</h2>
    </div>
  );
};

export default CartHeader;
