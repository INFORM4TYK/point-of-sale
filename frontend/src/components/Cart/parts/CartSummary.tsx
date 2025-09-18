import Decimal from "decimal.js";
import useCart from "../../../hooks/useCart";

const CartSummary = () => {
  const { total } = useCart();
  if (!total) return <div>Bład</div>;
  const normalizedTotalPrice = new Decimal(total).div(100).toFixed(2);
  return <div>Łącznie wyszło : {normalizedTotalPrice} PLN</div>;
};

export default CartSummary;
