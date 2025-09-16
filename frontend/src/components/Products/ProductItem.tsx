import React, { useState } from "react";
import type { Product } from "../../types/Product";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
const ProductItem = ({ product }: { product: Product }) => {
  console.log("💀 ~ ProductItem ~ product:", product);
  const rating = Number(product.rating_rate);
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  return (
    <div
      className="p-2 flex-wrap cursor-pointer flex-col flex h-full w-full gap-2 bg-white border-2 shadow-md rounded-lg overflow-hidden 
                transform transition duration-100 hover:scale-101 hover:shadow-xl"
    >
      <div className="bg-gray-200 flex-1 rounded-md p-2 grid place-items-center">
        <img
          className="w-auto max-h-[240px] py-2 mx-auto object-contain"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="flex-1 px-2 flex flex-col">
        <div className="space-y-2">
          <p className="text-sm uppercase text-gray-500">{product.category}</p>
          <p className="text-base font-bold text-gray-800 line-clamp-2">
            {product.title}
          </p>
          <p className="text-sm text-gray-500 line-clamp-3">
            {product.description}
          </p>
        </div>
        <div className=" flex-1  flex items-end justify-between py-2">
          <div className="flex items-center gap-1 ">
            <StarIcon
              sx={{ fontSize: "1.5rem !important", color: "goldenrod" }}
            />
            <strong> {rating.toFixed(1)}</strong>{" "}
            <p className="text-xs"> ({product.rating_count}) </p>
          </div>
          <p className="text-gray-700 font-semibold text-end text-2xl">
            ${product.price}
          </p>
        </div>
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
      </div>
    </div>
  );
};

export default ProductItem;

//     <div className="bg-gray-100 flex-1 p-2 flex flex-col justify-between">
//       <div>
//         <p className="text-xs text-gray-500">{product.category}</p>
//         <p className="text-base font-bold text-gray-800 line-clamp-2">
//           {product.title}
//         </p>
//       </div>
//       <div className="flex justify-between items-end gap-2">
//         <div className="flex items-center gap-1">
//           <StarIcon
//             sx={{ fontSize: "1.5rem !important", color: "goldenrod" }}
//           />
//           <strong> {rating.toFixed(1)}</strong>{" "}
//           <p className="text-xs"> ({product.rating_count}) </p>
//         </div>

//         <p className="text-gray-700 font-semibold text-end text-2xl">
//           ${product.price}
//         </p>
//       </div>
//       <div>
//         <button></button>
//       </div>
//     </div>
