import { Divider } from "@mui/material";
import type { OrderItemEnriched } from "../../../types/Order";
import Decimal from "decimal.js";

const OrderItem = ({ item }: { item: OrderItemEnriched }) => {
  const normalizedPrice = new Decimal(item.price).div(100).toFixed(2);
  const normalizedTotalPrice = new Decimal(item.price)
    .mul(item.amount)
    .div(100)
    .toFixed(2);
  return (
    <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 p-2 sm:p-4 border-b border-gray-200 hover:bg-gray-50 transition">
      <span className="font-semibold text-sm ">ID: {item.product_id}</span>
      <div className="bg-gray-200 flex-1 max-w-[100px] rounded-md p-2 grid place-items-center">
        <img
          className="w-auto max-h-[60px] py-2 mx-auto object-contain"
          src={item?.image}
          alt="test"
        />
      </div>
      <span className="flex-1  font-medium text-xm sm:text-base">
        {item.title}
      </span>
      <span className="text-sm">Ilość: {item.amount}</span>
      <Divider orientation="vertical" flexItem />
      <span className="text-sm">Cena: ${normalizedPrice}</span>
      <Divider orientation="vertical" flexItem />
      <span className="text-sm font-semibold">
        Razem: ${normalizedTotalPrice}
      </span>
    </li>
  );
};

export default OrderItem;
