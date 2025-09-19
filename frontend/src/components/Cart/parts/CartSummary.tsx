import Decimal from "decimal.js";
import useCart from "../../../hooks/useCart";

const CartSummary = () => {
  const { total, cart } = useCart();
  if (cart.length > 1 && !total) return <div>Bład</div>;
  const normalizedTotalPrice = new Decimal(total ?? 0).div(100).toFixed(2);
  return (
    <div className="flex justify-between gap-2 items-end">
      <h2>Łącznie</h2>
      <strong className="text-2xl">{normalizedTotalPrice} PLN</strong>
    </div>
  );
};

export default CartSummary;
