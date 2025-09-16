import { useNavigate } from "react-router-dom";

const ProductItemInfo = ({
  title,
  description,
  category,
  product_id,
}: {
  product_id: number;
  title: string;
  description: string;
  category: string;
}) => {
  const router = useNavigate();

  return (
    <div className="space-y-2">
      <p className="text-sm uppercase text-gray-500">{category}</p>
      <p
        onClick={() => router(`/product/${product_id}`)}
        className="text-base font-bold text-gray-800 cursor-pointer line-clamp-2 hover:underline"
      >
        {title}
      </p>
      <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
    </div>
  );
};

export default ProductItemInfo;
