import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { CircularProgress } from "@mui/material";

const DashboardStatItem = ({
  loading,
  title,
  stats,
  icon,
}: {
  loading: boolean;
  title: string;
  stats: number | string;
  icon: "customers" | "money" | "sold_products" | "orders";
}) => {
  let IconComponent;

  switch (icon) {
    case "customers":
      IconComponent = PeopleAltIcon;
      break;
    case "money":
      IconComponent = MonetizationOnIcon;
      break;
    case "sold_products":
      IconComponent = ShoppingCartIcon;
      break;
    case "orders":
      IconComponent = ReceiptIcon;
      break;
    default:
      IconComponent = ReceiptIcon;
  }

  return (
    <div className="flex-1 h-full min-w-[200px] border-2 flex flex-col p-2 lg:px-6 lg:py-4 rounded-xl gap-2">
      <div className="flex items-center gap-2">
        <IconComponent className="text-gray-400" />
        <p className="text-gray-600 text-sm lg:text-base font-semibold">{title}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-2xl text-textDark font-bold">
          {!loading ? stats : <CircularProgress sx={{ fontSize: ".2rem" }} />}
        </p>
      </div>
    </div>
  );
};

export default DashboardStatItem;
