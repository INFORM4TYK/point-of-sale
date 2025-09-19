import { createContext, useState, type Dispatch, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCartItems,
  addItemToCart,
  updateItemToCart,
  removeItemFromCart,
  getCartTotal,
  clearCart,
} from "../services/cartService";
import type { CartProduct } from "../types/Product";

export type CartContextInterface = {
  cart: CartProduct[];
  total: number | null;
  activeCart: number;
  setActiveCart: Dispatch<number>;
  isLoadingCart: boolean;
  isLoadingTotal: boolean;
  clearCart: () => void;
  addToCart: (productId: number, stock: number ,amount?: number, ) => void;
  updateCartItem: (productId: number, amount: number) => void;
  removeFromCart: (productId: number) => void;
};

export const CartContext = createContext<CartContextInterface | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [activeCart, setActiveCart] = useState(1);

  const { data: cart = [], isLoading } = useQuery({
    queryKey: ["cart", activeCart],
    queryFn: () => getCartItems({ cartId: activeCart }),
  });

  const { data: total = 0, isLoading: isLoadingTotal } = useQuery({
    queryKey: ["cartTotal", activeCart],
    queryFn: () => getCartTotal({ cartId: activeCart }),
  });
  const addMutation = useMutation({
    mutationFn: ({
      productId,
      amount,
      stock,
    }: {
      productId: number;
      amount?: number;
      stock: number;
    }) => {
      const qtyToAdd = amount ?? 1;

      const existingItem = cart.find((item) => item.product_id === productId);
      const existingAmount = existingItem?.amount ?? 0;

      if (existingAmount + qtyToAdd > stock) {
        throw new Error("Nie można dodać więcej niż dostępny stan magazynowy");
      }

      return addItemToCart({
        productId,
        amount: qtyToAdd,
        cartId: activeCart,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({
      productId,
      amount,
    }: {
      productId: number;
      amount: number;
    }) =>
      updateItemToCart({
        productId: productId,
        updated_amount: amount ?? 1,
        cartId: activeCart,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: number) =>
      removeItemFromCart({ productId: productId, cartId: activeCart }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
    },
  });

  const clearAllCartMutation = useMutation({
    mutationFn: () => clearCart({ cartId: activeCart }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
    },
  });
  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        activeCart,
        setActiveCart,
        isLoadingCart: isLoading,
        isLoadingTotal,
        clearCart: clearAllCartMutation.mutate,
        addToCart: (productId,  stock, amount,) =>
          addMutation.mutate({ productId, stock , amount}),
        updateCartItem: (productId, amount) =>
          updateMutation.mutate({ productId, amount }),
        removeFromCart: (productId) => removeMutation.mutate(productId),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};