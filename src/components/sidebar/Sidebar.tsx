import styled from "styled-components";

export const SideBar = () => {
  const popularBooks = Array.from({ length: 2 });

  return (
    <Container>
      <SideSection>
        <SectionTitle>Popular books </SectionTitle>
        {popularBooks.map((item) => {
          return <Item>100 Books to Read Today</Item>;
        })}
      </SideSection>

      <SideSection>
        <SectionTitle>New releases </SectionTitle>
        {popularBooks.map((item) => {
          return <Item>100 Books to Read</Item>;
        })}
      </SideSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SectionTitle = styled.p`
  margin: 0px;
  font-weight: 600;
  font-size: 20px;
`;

const Item = styled.p`
  margin: 0;
  padding: 8px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;
