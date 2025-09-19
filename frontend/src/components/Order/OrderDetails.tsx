import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { createOrder } from "../../services/orderService";
import type { Order } from "../../types/Order";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OrderItem from "./parts/OrderItem";
import OrderCustomer from "./parts/OrderCustomer";
import OrderHeader from "./parts/OrderHeader";
import useLoading from "../../hooks/useLoading";
import OrderActions from "./parts/OrderActions";

const OrderDetails = ({ id }: { id: string | null }) => {
  const { total, cart, clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const router = useNavigate();
  const { startLoading } = useLoading();
  useEffect(() => {
    const loadOrder = async () => {
      const stopLoading = startLoading();
      try {
        if (id && cart.length > 0 && total) {
          const newOrder = await createOrder({ cartId: id as string });
          console.log("💀 ~ loadOrder ~ newOrder:", newOrder);
          router(`/order/${newOrder.id}`, { replace: true });
          setOrder(newOrder);
          clearCart();
          return;
        }
      } catch (err) {
        console.error("Błąd podczas ładowania zamówienia:", err);
      } finally {
        stopLoading();
      }
    };

    loadOrder();
  }, [id, cart, total]);
  if (!order) return <div>Ładowanie zamówienia...</div>;

  return (
    <div className="h-full min-h-screen grid place-items-center pt-20 md:pt-0">
      <div className="p-4 w-full mx-auto max-w-[1200px] h-fit flex flex-col justify-center bg-gray-50 rounded-lg shadow">
        <div
          onClick={() => router(-1)}
          className="absolute top-4 left-4 lg:top-10 lg:left-10 bg-primary p-2 rounded-xl px-6 cursor-pointer"
        >
          <KeyboardBackspaceIcon className="text-white" fontSize="large" />
        </div>
        <OrderHeader id={order.id} total={order.total} />

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Produkty:</h3>
          <ul className="divide-y divide-gray-200">
            {order.items.map((item) => {
              return <OrderItem item={item} />;
            })}
          </ul>
        </div>

        <OrderCustomer orderId={order.id} />
        <OrderActions id={order.id} />
      </div>
    </div>
  );
};

export default OrderDetails;
