import type { CartProduct, Product } from "../../../../types/Product";
import { Add, Remove } from "@mui/icons-material";

const CartItem = ({ cartProduct }: { cartProduct: CartProduct }) => {
  console.log("💀 ~ CartItem ~ cartProduct:", cartProduct)
  // price per one
  // all price
  // add button
  // decrease
  // remove button
  const addAmount = () => {
  };
  const reduceAmount = () => {};
  
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
        <div className="flex flex-col justify-between gap-1 flex-1">
          <p className="line-clamp-1 text-xs">{cartProduct?.title}</p>
          <p className="text-sm text-gray-400">
            Ilość: <strong>{cartProduct.amount}</strong>
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-stretch rounded-md overflow-hidden w-max ">
            <button
              disabled={cartProduct.amount === 1}
              onClick={() => reduceAmount()}
              className="p-1  bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:opacity-50 transition"
            >
              <Remove fontSize="small" />
            </button>

            <span className="px-2 text-center grid place-items-center border">
              {cartProduct.amount}
            </span>

            <button
              disabled={cartProduct.amount === cartProduct?.stock}
              onClick={() => addAmount()}
              className="p-1 bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:opacity-50 transition "
            >
              <Add fontSize="small" />
            </button>
          </div>
          <div className="flex items-center justify-between flex-1 gap-1 px-1">
            <p className="text-xs text-gray-400">
              {cartProduct.amount} x {cartProduct?.price} PLN
            </p>
            <strong>
              {cartProduct.amount * cartProduct?.price}
              <span className="text-sm font-normal">PLN</span>
            </strong>
          </div>
          {/* <button className="rounded-lg w-[30px] bg-red-500">
            <CloseIcon sx={{ color: "white" }} />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
