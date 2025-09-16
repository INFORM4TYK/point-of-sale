import React from "react";

const ProductItemThumbnail = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => {
  return (
    <div className="bg-gray-200 flex-1 rounded-md p-2 grid place-items-center">
      <img
        className="w-auto max-h-[240px] py-2 mx-auto object-contain"
        src={image}
        alt={title}
      />
    </div>
  );
};

export default ProductItemThumbnail;
