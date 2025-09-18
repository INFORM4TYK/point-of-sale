import StarIcon from "@mui/icons-material/Star";
import Decimal from "decimal.js";

const ProductItemDetails = ({
  rating_rate,
  rating_count,
  price, 
}: {
  rating_rate: string;
  rating_count: number;
  price: number;
}) => {
  const ratingNumber = Number(rating_rate);

const normalizedPrice = new Decimal(price).div(100).toFixed(2);
  return (
    <div className="flex-1 flex items-end justify-between py-2">
      <div className="flex items-center gap-1">
        <StarIcon sx={{ fontSize: "1.5rem !important", color: "goldenrod" }} />
        <strong>{ratingNumber.toFixed(1)}</strong>{" "}
        <p className="text-xs">({rating_count})</p>
      </div>
      <p className="text-gray-700 font-semibold text-end text-2xl">{normalizedPrice} PLN</p>
    </div>
  );
};

export default ProductItemDetails;