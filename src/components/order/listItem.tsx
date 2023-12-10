import { styled } from "styled-components";
import { CartItemInterface } from "../store";

import { FaSpinner } from "react-icons/fa";
import axiosInstance from "../../api";
import { useState } from "react";
import { useCart } from "../store";
import { MdDelete } from "react-icons/md";

export const ListItem = (item: CartItemInterface) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { cart, updateCart } = useCart();

  const removeCartItem = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await axiosInstance.post(`/cart/remove-item`, {
        cartId: cart.id,
        bookId: id,
      });

      updateCart(response.data);
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartItem key={item.id}>
      <ItemDetails>
        <ItemImage src={item?.book?.thumbnail} />
        <ItemName>{item?.book?.title}</ItemName>
        <ItemPrice>${item?.book?.price}</ItemPrice>
        <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
      </ItemDetails>
      {isDeleting ? (
        <FaSpinner size={30} />
      ) : (
        <MdDelete
          style={{ cursor: "pointer" }}
          onClick={() => removeCartItem(item?.book.id)}
          size={20}
        />
      )}
    </CartItem>
  );
};

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ItemPrice = styled.p`
  font-size: 14px;
  color: #888;
`;

const ItemQuantity = styled.p`
  font-size: 14px;
  color: #888;
`;

const ItemImage = styled.img`
  width: 127px;
  max-width: 127px;
  height: 150px;
  display: block;
  cursor: pointer;
`;
