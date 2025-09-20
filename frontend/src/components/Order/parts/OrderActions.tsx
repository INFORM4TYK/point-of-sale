import { useNavigate } from "react-router-dom";
import { markOrderAsPaid } from "../../../services/orderService";
const OrderActions = ({ id }: { id: number }) => {
  const router = useNavigate()
  return (
    <div className="flex gap-2 justify-end">
      {/* <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Anuluj
      </button> */}
      <button
        onClick={() => {markOrderAsPaid(id).then(() => router('/dashboard?tab=orders'))}}
        className="px-4 py-2 bg-green-500 max-w-[400px] w-full text-white rounded hover:bg-green-600"
      >
        Realizuj
      </button>
    </div>
  );
};

export default OrderActions;
