import React, { createContext, useContext, useEffect, useState } from "react";
import { BookInterface } from "../book/BookCard";

export interface CartItemInterface {
  id: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  book: BookInterface;
}

export interface CartInterface {
  id: string;
  total: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  cartItems: CartItemInterface[];
}

const CartContext = createContext({
  cart: {
    id: "",
    total: 0,
    quantity: 0,
    createdAt: "",
    updatedAt: "",
    cartItems: [
      {
        id: "",
        quantity: 0,
        createdAt: "",
        updatedAt: "",
        book: {
          id: "",

          title: "",

          price: 0,

          thumbnail: "",

          rating: 0,

          quantity: 0,

          createdAt: "",

          updatedAt: "",
        },
      },
    ],
  },
  updateCart: (newCart: CartInterface) => {},
});

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode | null;
}) => {
  const [cart, setCart] = useState<CartInterface>({
    id: "",
    total: 0,
    quantity: 0,
    createdAt: "",
    updatedAt: "",
    cartItems: [
      {
        id: "",
        quantity: 0,
        createdAt: "",
        updatedAt: "",
        book: {
          id: "",

          title: "",

          price: 0,

          thumbnail: "",

          rating: 0,

          quantity: 0,

          createdAt: "",

          updatedAt: "",
        },
      },
    ],
  });

  const updateCart = (newCart: CartInterface) => {
    setCart(newCart);

    // Update the cart count in local storage as well
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    // Update the cart count in local storage as well
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
