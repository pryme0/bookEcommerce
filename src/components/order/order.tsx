import { styled } from "styled-components";
import { FaSpinner } from "react-icons/fa";
import axiosInstance from "../../api";
import { useEffect, useState } from "react";
import { BookInterface } from "../book";
import InfiniteScroll from "react-infinite-scroll-component";
import { Layout } from "../layout";
import { OrderItem } from "./orderItem";

export interface UserInterface {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  points: number;
  updatedAt: string;
}

export interface OrderInterface {
  books: BookInterface[];
  user: UserInterface;
  createdAt: string;
  id: string;
  status: string;
  totalAmount: number;
  updatedAt: string;
}

export const Orders = () => {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [hasMore, setHasMore] = useState(true);

  const removeOrder = async (id: string) => {
    const updatedData = orders.filter((item) => item.id !== id);
    setOrders(updatedData);
  };

  const fetchOrders = async (currentPage: number) => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        let userId = JSON.parse(user).id;
        const response = await axiosInstance.get(`/orders`, {
          params: {
            filter: {
              userId: userId,
              page: currentPage,
              pageSize: 10,
            },
          },
        });
        setTotalCount(response.data.count);
        return response.data.orders;
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  };

  const loadMoreOrders = async () => {
    const currentPage = page + 1;
    const newOrders = await fetchOrders(currentPage);
    if (currentPage * 10 > totalCount) {
      setHasMore(false);
    }
    setOrders((prevOrders) => [...prevOrders, ...newOrders]);
    setPage(currentPage);
  };

  useEffect(() => {
    fetchOrders(1).then((orders) => {
      setOrders(orders);
    });
  }, []);

  return (
    <Layout>
      <Container>
        <Title>Your Orders</Title>
        <InfiniteScroll
          dataLength={orders.length}
          next={loadMoreOrders}
          hasMore={hasMore}
          loader={<FaSpinner size={30} />}
        >
          {orders.map((order, index) => (
            <OrderItem order={order} removeOrder={removeOrder} />
          ))}
        </InfiniteScroll>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;
