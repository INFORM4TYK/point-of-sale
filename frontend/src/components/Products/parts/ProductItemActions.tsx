import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import useCart from "../../../hooks/useCart";
const ProductItemActions = ({
  product_id,
  stock,
}: {
  product_id: number;
  stock: number;
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const increment = () =>
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));

  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="flex flex-wrap items-end justify-between my-1">
      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Dostępne <strong>{stock}</strong> sztuk
        </p>
        <div className="flex items-stretch rounded-md overflow-hidden w-max ">
          <button
            disabled={quantity === 1}
            onClick={decrement}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:opacity-50 transition h-[40px]"
          >
            <Remove />
          </button>

          <span className="px-4 text-center grid place-items-center border">
            {quantity}
          </span>

          <button
            disabled={quantity === stock}
            onClick={increment}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:opacity-50 transition h-[40px]"
          >
            <Add />
          </button>
        </div>
      </div>
      <button
        onClick={() => addToCart(product_id, stock ?? 0, quantity)}
        type="submit"
        className="hover:opacity-90 transform  transition duration-100 btn--gradient btn--primary h-[40px] font-normal text-sm px-4"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};

export default ProductItemActions;
