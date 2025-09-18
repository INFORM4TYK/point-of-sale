import { createContext, useState, type ReactNode } from "react";
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
  isLoadingCart: boolean;
  isLoadingTotal: boolean;
  clearCart: () => void;
  addToCart: (productId: number, amount?: number) => void;
  updateCartItem: (productId: number, amount: number) => void;
  removeFromCart: (productId: number) => void;
};

export const CartContext = createContext<CartContextInterface | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: cart = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });
  const { data: total = 0, isLoading: isLoadingTotal } = useQuery({
    queryKey: ["cartTotal"],
    queryFn: getCartTotal,
  });
  const addMutation = useMutation({
    mutationFn: ({
      productId,
      amount,
    }: {
      productId: number;
      amount?: number;
    }) => addItemToCart({ productId: productId, amount: amount ?? 1 }),
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
      updateItemToCart({ productId: productId, updated_amount: amount ?? 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: number) =>
      removeItemFromCart({ productId: productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
    },
  });

  const clearAllCartMutation = useMutation({
    mutationFn: () => clearCart(),
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
        isLoadingCart: isLoading,
        isLoadingTotal,
        clearCart: clearAllCartMutation.mutate,
        addToCart: (productId, amount) =>
          addMutation.mutate({ productId, amount }),
        updateCartItem: (productId, amount) =>
          updateMutation.mutate({ productId, amount }),
        removeFromCart: (productId) => removeMutation.mutate(productId),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
