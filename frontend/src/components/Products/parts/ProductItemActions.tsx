import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";

const ProductItemActions = ({
  product_id,
  stock,
}: {
  product_id: number;
  stock: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () =>
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));

  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const addToCart = () => {
    console.log(
      `Dodano do korzyka produckt o id ${product_id} w ilości ${quantity}`
    );
  };
  return (
    <div className="flex flex-wrap items-end justify-between my-1">
      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Dostępne <strong>{stock}</strong> sztuk
        </p>
        <div className="flex items-center border rounded-md overflow-hidden w-max ">
          <button
            disabled={quantity === 1}
            onClick={decrement}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition h-[40px]"
          >
            <Remove />
          </button>
          <span className="px-4 text-center">{quantity}</span>
          <button
            disabled={quantity === stock}
            onClick={increment}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition h-[40px]"
          >
            <Add />
          </button>
        </div>
      </div>
      <button
        onClick={() => addToCart()}
        type="submit"
        className="btn--gradient btn--primary h-[40px] font-normal text-sm px-4"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};

export default ProductItemActions;
