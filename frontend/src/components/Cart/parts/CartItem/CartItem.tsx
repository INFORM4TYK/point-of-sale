import Decimal from "decimal.js";
import useCart from "../../../../hooks/useCart";
import type { CartProduct } from "../../../../types/Product";
import { Add, Remove } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const CartItem = ({ cartProduct }: { cartProduct: CartProduct }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const normalizedTotalPrice = new Decimal(cartProduct.price)
    .mul(cartProduct.amount)
    .div(100)
    .toFixed(2);
  const normalizedPrice = new Decimal(cartProduct.price).div(100).toFixed(2);
  return (
    <div className="w-full flex gap-2  px-2">
      <div className="bg-gray-200 flex-1 max-w-[100px] rounded-md p-2 grid place-items-center">
        <img
          className="w-auto max-h-[60px] py-2 mx-auto object-contain"
          src={cartProduct?.image}
          alt="test"
        />
      </div>
      <div className="flex-[2] flex justify-between flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-between gap-1 flex-1">
            <p className=" text-xs line-clamp-1">{cartProduct?.title}</p>
            <p className="text-sm text-gray-400">
              Ilość: <strong>{cartProduct.amount}</strong>
            </p>
          </div>
          <button
            className="bg-red-500 rounded-lg p-1"
            onClick={() => removeFromCart(cartProduct.product_id)}
          >
            <DeleteForeverIcon fontSize="small" className="text-white" />
          </button>
        </div>
        <div className="flex justify-between">
          <div className="flex items-stretch rounded-md overflow-hidden w-max ">
            <button
              disabled={cartProduct.amount === 1}
              onClick={() =>
                updateCartItem(cartProduct.product_id, cartProduct.amount - 1)
              }
              className="p-1  bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:opacity-50 transition"
            >
              <Remove fontSize="small" />
            </button>

            <span className="px-2 text-center grid place-items-center border">
              {cartProduct.amount}
            </span>

            <button
              disabled={cartProduct.amount === cartProduct?.stock}
              onClick={() =>
                updateCartItem(cartProduct.product_id, cartProduct.amount + 1)
              }
              className="p-1 bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:opacity-50 transition "
            >
              <Add fontSize="small" />
            </button>
          </div>
          <div className="flex items-center justify-between flex-1 gap-1 px-1">
            <p className="text-xs text-gray-400">
              {cartProduct.amount} x {normalizedPrice} PLN
            </p>
            <strong className="space-x-2">
              <span>{normalizedTotalPrice}</span>
              <span className="text-sm font-normal">PLN</span>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
