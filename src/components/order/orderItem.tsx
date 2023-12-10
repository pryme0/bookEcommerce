import { styled } from "styled-components";
import { OrderInterface } from "./order";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import axiosInstance from "../../api";

export const OrderItem = ({
  order,
  removeOrder,
}: {
  order: OrderInterface;
  removeOrder: (id: string) => void;
}) => {
  const [cancelingOrder, setCancelingOrder] = useState(false);

  const cancelOrder = async (id: string) => {
    try {
      setCancelingOrder(true);
      await axiosInstance.delete(`/orders/${id}`);
      removeOrder(id);
      setCancelingOrder(false);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <OrderCard>
      <OrderDetails>
        <OrderId>Order ID: {order.id}</OrderId>
        <OrderStatus>Status: {order.status}</OrderStatus>
        <TotalAmount>Total Amount: ${order.totalAmount}</TotalAmount>
        <OrderDate>Order Date: {order.createdAt}</OrderDate>
      </OrderDetails>
      <BookList>
        <BookHeader>Books:</BookHeader>
        {order.books &&
          order.books.map((book) => (
            <BookItem key={book.id}>{book.title}</BookItem>
          ))}
      </BookList>

      {cancelingOrder ? (
        <FaSpinner size={30} />
      ) : (
        <CancelButton onClick={() => cancelOrder(order.id)}>
          Cancel order
        </CancelButton>
      )}
    </OrderCard>
  );
};

const OrderCard = styled.div`
  border: 1px solid #ddd;
  margin-bottom: 20px;
  padding: 10px;
`;

const OrderDetails = styled.div`
  margin-bottom: 10px;
`;

const OrderId = styled.p`
  font-weight: bold;
`;

const OrderStatus = styled.p`
  color: #007bff;
`;

const TotalAmount = styled.p`
  font-weight: bold;
`;

const OrderDate = styled.p`
  font-style: italic;
`;

const BookList = styled.div``;

const BookHeader = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const BookItem = styled.div`
  margin-left: 20px;
`;

const CancelButton = styled.button`
  margin: 30px auto;
  width: 150px;
  padding: 10px;
  background-color: #5a0b4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  &:hover {
    background-color: #752768;
  }
`;
