import { useParams } from "react-router-dom";
import OrderDetails from "../../components/Order/OrderDetails";

const OrderPage = () => {
  const { id } = useParams<{ id?: string }>(); 

  return <OrderDetails id={id || null} />;
};

export default OrderPage;
