import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { Order } from "../../../types/Order";
import Decimal from "decimal.js";
import { useEffect, useState, type Dispatch } from "react";
import type { Customer } from "../../../types/Customer";
import { getCustomerById } from "../../../services/customerService";
import { markOrderAsPaid } from "../../../services/orderService";
import OrderItem from "./OrderItem";
import OrderCustomerSecond from "./OrderCustomerSecond";

const OrderStackItem = ({
  order,
  setReload,
}: {
  order: Order;
  setReload: Dispatch<(prev: boolean) => boolean>;
}) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (order.customer_id) {
        setLoadingCustomer(true);
        try {
          const data = await getCustomerById(order.customer_id);
          setCustomer(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingCustomer(false);
        }
      }
    };
    fetchCustomer();
  }, [order.customer_id]);

  const handleMarkAsPaid = async () => {
    await markOrderAsPaid(order.id);
    setReload((prev) => !prev);
  };

  const normalizedPrice = new Decimal(order.total).div(100).toFixed(2);
  const totalItems = order.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <li className="p-3 border w-full rounded shadow flex justify-between  flex-wrap sm:flex-nowrap">
        <div className="space-y-1 w-[200px]">
          <div className="flex justify-between gap-8 ">
            <strong>ID:</strong> <span>{order.id}</span>
          </div>
          <div className="flex justify-between gap-8">
            <strong>Ilość:</strong> <span>{totalItems}</span>
          </div>
          <div className="flex justify-between gap-8">
            <strong>Klient:</strong>
            <span>
              {loadingCustomer ? (
                "Ładowanie..."
              ) : customer ? (
                <div>{customer.name}</div>
              ) : editingCustomer ? (
                <OrderCustomerSecond orderId={order.id} setReload={setReload} />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setEditingCustomer(true)}
                >
                  Dodaj klienta
                </Button>
              )}
            </span>
          </div>
        </div>
        <div className="space-y-1  flex flex-col-reverse">
          <div className="flex justify-end">
            <span>{new Date(order.created_at).toLocaleString()}</span>
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
                  order.status === "paid" ? "text-green-500" : "text-red-500"
                }`}
              >
                {order.status === "paid" ? "Opłacone" : "Nieopłacone"}
              </span>
              {order.status === "unpaid" && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleMarkAsPaid}
                >
                  Opłać
                </Button>
              )}
            </div>
          </div>
        </div>
      </li>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

export default OrderStackItem;
