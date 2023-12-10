import styled from "styled-components";

export const Footer = () => {
  return (
    <Container>
      <p>Footer</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: #5a0b4d;
  margin-top: auto;
  color: #fff;
  p {
    font-size: 20px;
    font-weight: 700;
  }
`;
