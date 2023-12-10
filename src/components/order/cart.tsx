import { styled } from "styled-components";
import { useCart } from "../store";
import { ListItem } from "./listItem";
import { useState } from "react";
import axiosInstance from "../../api";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { Layout } from "../layout";

export const Cart = () => {
  const [creatingOrder, setCreatingOrder] = useState(false);

  const { cart, updateCart } = useCart();

  const createOrder = async () => {
    try {
      const bookIds: string[] = cart.cartItems.map(
        (cartItem) => cartItem.book.id
      );

      setCreatingOrder(true);
      const response = await axiosInstance.post(`/orders`, {
        cartId: cart.id,
        bookIds,
      });
      updateCart(response.data.cart);
      setCreatingOrder(false);
      toast.success("Order created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container>
        <HeaderContainer>
          <Title>Cart</Title>
        </HeaderContainer>

        <CartList>
          {cart?.cartItems &&
            cart?.cartItems.map((item, index) => (
              <ListItem key={index} {...item} />
            ))}
        </CartList>

        <TotalContainer>
          <TotalLabel>Total:</TotalLabel>
          <TotalAmount>${cart.total}</TotalAmount>
        </TotalContainer>

        {creatingOrder ? (
          <FaSpinner size={30} />
        ) : (
          <OrderButton onClick={createOrder}>Order</OrderButton>
        )}
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  margin: 40px auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const TotalLabel = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const TotalAmount = styled.p`
  font-size: 18px;
  color: #27ae60;
`;

const OrderButton = styled.button`
  margin: 0px auto;
  width: 200px;
  padding: 20px;
  background-color: #5a0b4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  &:hover {
    background-color: #752768;
  }
`;
