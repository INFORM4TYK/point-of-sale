import useCart from "../../../hooks/useCart";
const CartHeader = () => {
  const { cart } = useCart();
  return (
    <div className="flex justify-between gap-2 items-center px-2 mt-2 mb-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Aktualne zamówienie</h2>
        <p className="text-gray-500">Ilość: {cart.length ?? 0}</p>
      </div>
    </div>
  );
};

export default CartHeader;
