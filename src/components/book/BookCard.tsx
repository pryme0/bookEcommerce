import styled from "styled-components";
import { FaStar, FaStarHalf } from "react-icons/fa";
import axiosInstance from "../../api";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../store";

export interface BookInterface {
  id: string;

  title: string;

  price: number;

  thumbnail: string;

  rating: number;

  quantity: number;

  createdAt: string;

  updatedAt: string;
}

export const BookCard = ({
  id,
  title,
  price,
  thumbnail,
  rating,
  quantity,
  createdAt,
  updatedAt,
}: BookInterface) => {
  const [addingToCart, setAddingToCart] = useState(false);

  const { updateCart } = useCart();

  const Star = ({
    isFilled,
    isHalf,
  }: {
    isFilled: boolean;
    isHalf: boolean;
  }) => {
    if (isHalf) {
      return <HalfStar />;
    }

    return <FullStar isFilled={isFilled} />;
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1 <= rating);

    return (
      <StarRatingContainer>
        {stars.map((isFilled, index) => (
          <Star
            key={index}
            isFilled={isFilled}
            isHalf={index + 0.5 === rating}
          />
        ))}
      </StarRatingContainer>
    );
  };

  const AddItemToCart = async (id: string, quantity: number, price: number) => {
    setAddingToCart(true);
    let stringiFiedCart = localStorage.getItem("cart");
    if (stringiFiedCart) {
      const cart = JSON.parse(stringiFiedCart);

      try {
        const response = await axiosInstance.patch(`/cart/${cart.id}`, {
          id: cart.id,
          data: {
            quantity,
            total: price,
            bookId: id,
          },
        });
        localStorage.setItem("cart", JSON.stringify(response.data));
        setAddingToCart(false);
        updateCart(response.data);
        toast.success("Item added to cart successfully");
      } catch (error: any) {
        setAddingToCart(false);
        toast.success(error?.response?.data.message || "operation failed");
      }
    }
  };

  return (
    <Container>
      <BookImage src={thumbnail} />
      <BookTitle>{title}</BookTitle>
      <StarRating rating={rating} />
      <BookTitle>{price}</BookTitle>
      <Button onClick={() => AddItemToCart(id, 1, price)}>
        {addingToCart ? <FaSpinner className="spin" /> : "Add to cart"}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  width: 300px;
  margin-bottom: 20px;
  border: 1px solid #d5dbdb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BookImage = styled.img`
  width: 127px;
  max-width: 127px;
  height: auto;
  display: block;
  cursor: pointer;
`;

const BookTitle = styled.p`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
`;

const HalfStar = styled(FaStarHalf)`
  color: #ffd700;
  margin-right: 5px;
`;

const FullStar = styled(FaStar)<{ isFilled: boolean }>`
  color: ${({ isFilled }) => (isFilled ? "#FFD700" : "#ddd")};
  margin-right: 5px;
`;

const StarRatingContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #e1f40c;
  color: #010101;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #becd19;
  }
`;
