import React from "react";

const ProductItemInfo = ({
  title,
  description,
  category,
}: {
  title: string;
  description: string;
  category: string;
}) => {
  return (
    <div className="space-y-2">
      <p className="text-sm uppercase text-gray-500">{category}</p>
      <p className="text-base font-bold text-gray-800 line-clamp-2">{title}</p>
      <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
    </div>
  );
};

export default ProductItemInfo;
