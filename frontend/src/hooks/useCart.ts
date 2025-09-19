import { useContext } from "react";

import { CartContext, type CartContextInterface } from "../context/CartContext";

const useCart = () => useContext(CartContext) as CartContextInterface;

export default useCart;
