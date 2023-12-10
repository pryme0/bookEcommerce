import styled from "styled-components";
import { Layout } from "../layout";
import { BookCard, BookInterface } from "../book";
import axiosInstance from "../../api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const Home = () => {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getBooks = async () => {
    return (await axiosInstance.get(`/books?page=${page}&pageSize=5`)).data;
  };

  const fetchBooks = async () => {
    const books = await getBooks();
    if (books.length === 0) {
      setHasMore(false);
    }

    setBooks((prevBooks) => [...(prevBooks || []), ...books.books]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Layout>
      <Container>
        <HeaderSection>
          <HeaderTitle>Books at varyOne</HeaderTitle>
        </HeaderSection>
        <div>
          <BannerImage src="/TopBanner.jpg" alt="My Image" />
        </div>
        <ContentContainer>
          <SectionTitle>Best seller</SectionTitle>

          <InfiniteScroll
            dataLength={books.length}
            next={fetchBooks}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more books</b>
              </p>
            }
          >
            <BestSellerContainer>
              {books &&
                books.map((book, index) => (
                  <div key={index}>
                    <BookCard
                      id={book.id}
                      title={book.title}
                      price={book.price}
                      thumbnail={book.thumbnail}
                      rating={book.rating}
                      quantity={book.quantity}
                      createdAt={book.createdAt}
                      updatedAt={book.updatedAt}
                    />
                  </div>
                ))}
            </BestSellerContainer>
          </InfiniteScroll>
        </ContentContainer>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 10px 50px;
`;

const HeaderSection = styled.div`
  height: 40px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled.p`
  font-size: 30px;
  font-weight: 400;
`;

const BannerImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  padding: 20px;
`;

const BestSellerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-content: center;
`;

const SectionTitle = styled.p`
  font-size: 30px;
  font-weight: 400;

  @media (max-width: 768px) {
    text-align: center;
  }
`;
