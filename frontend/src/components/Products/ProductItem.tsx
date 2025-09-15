import React from "react";
import type { Product } from "../../types/Product";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden m-4">
  <img
    className="w-full h-48 object-cover"
    src={product.image}
    alt={product.title}
  />
  <div className="p-4">
    <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
    <p className="text-gray-700 font-semibold mb-2">${product.price}</p>
    <div className="flex items-center justify-between text-sm text-gray-600">
      <span>Rating: {product.rating.rate} ⭐</span>
      <span>Reviews: {product.rating.count}</span>
    </div>
  </div>
</div>
  );
};

export default ProductItem;
