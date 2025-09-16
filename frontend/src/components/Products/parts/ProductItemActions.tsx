import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";

const ProductItemActions = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  return (
    <div className="flex flex-wrap items-end justify-between ">
      <div className="flex items-center border rounded-md overflow-hidden w-max ">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition h-[40px]"
        >
          <Remove />
        </button>
        <span className="px-4 text-center">{quantity}</span>
        <button
          onClick={increment}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition h-[40px]"
        >
          <Add />
        </button>
      </div>
      <button
        type="submit"
        className="btn--gradient btn--primary h-[40px] font-normal text-sm px-4"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};

export default ProductItemActions;
