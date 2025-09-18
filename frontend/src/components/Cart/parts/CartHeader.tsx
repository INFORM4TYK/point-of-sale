import useCart from "../../../hooks/useCart";
const CartHeader = () => {
  const { cart,setActiveCart, activeCart } = useCart();
   const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0);
  return (
    <div className="flex justify-between gap-2 items-center px-2 mt-2 mb-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Aktualne zamówienie</h2>
        <p className="text-gray-500">Ilość: {totalAmount ?? 0}</p>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-center text-gray-400">Wybierz koszyk</p>
        <div className="flex gap-2">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              onClick={() => setActiveCart(id)}
              className={`hover:opacity-90 w-10 h-10 grid place-items-center text-sm uppercase font-semibold rounded-lg cursor-pointer transition ${
                activeCart === id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
