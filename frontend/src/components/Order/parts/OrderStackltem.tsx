import type { Order } from "../../../types/Order";
import Decimal from "decimal.js";
import OrderItem from "./OrderItem";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
const OrderStackltem = ({ order }: { order: Order }) => {
  console.log("💀 ~ OrderStackltem ~ order:", order);
  const normalizedPrice = new Decimal(order.total).div(100).toFixed(2);
  const totalItems = order.items.reduce((sum, item) => sum + item.amount, 0);
  const [status, setStatus] = useState<"paid" | "unpaid">(
    Math.random() > 0.5 ? "paid" : "unpaid"
  );

  const handlePay = () => {
    console.log(`Opłać zamówienie ${order.id}`);
    // tu w przyszłości logika do płatności
  };
  return (
    <>
      <li
        key={order.id}
        className="p-3 border w-full rounded shadow flex justify-between"
      >
        <div className="space-y-1">
          <div className="flex justify-between gap-8">
            <strong>ID:</strong> <span>{order.id}</span>
          </div>
          <div className="flex justify-between gap-8">
            <strong>Ilość:</strong> <span>{totalItems}</span>
          </div>
          <div className="flex justify-between gap-8">
            <strong>Klient:</strong> <span> {order.customer_id ?? "-"}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-end">
            <span> {new Date(order.created_at).toLocaleString()} </span>
          </div>
          <div className="flex justify-between gap-8">
            <strong>Suma:</strong>
            <span className="font-bold text-gray-950">
              {normalizedPrice} PLN
            </span>
          </div>
          <div className="flex justify-between gap-8 items-center">
            <strong>Status:</strong>
            <div className="flex flex-col">
              <span
                className={`font-bold ${
                  status === "paid" ? "text-green-500" : "text-red-500"
                }`}
              >
                {status === "paid" ? "Opłacone" : "Nieopłacone"}
              </span>
              {status === "unpaid" && (
                <button
                  onClick={handlePay}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Opłać
                </button>
              )}
            </div>
          </div>
        </div>
      </li>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`order-${order.id}-content`}
          id={`order-${order.id}-header`}
        >
          Szczegóły zamówienia
        </AccordionSummary>
        <AccordionDetails>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <OrderItem key={item.product_id} item={item} />
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default OrderStackltem;
