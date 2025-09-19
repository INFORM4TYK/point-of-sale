import CloseIcon from "@mui/icons-material/Close";
import useCart from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";
export const CartActions = ({id} : {id: number}) => {
  const { clearCart } = useCart();
  const router = useNavigate();
  return (
    <div className="flex px-2 py-4 justify-between gap-2 items-center flex-wrap">
      <button
        className="hover:opacity-90 px-4  h-[40px] w-fit btn bg-red-500"
        onClick={() => clearCart()}
      >
        <CloseIcon sx={{ color: "white" }} />
      </button>
      <button
        onClick={() => router(`/order/${id}`)}
        type="submit"
        className="hover:opacity-90 flex-1 transform  transition duration-100 btn h-[40px] bg-green-500 text-white font-normal text-sm px-4"
      >
        Realizuj zamówienie
      </button>
    </div>
  );
};
