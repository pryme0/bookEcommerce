import React, { ReactNode } from "react";
import styled from "styled-components";
import { Footer } from "./footer";
import { Header } from "./header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <ContentContainer>
        <SideContainer>Side container</SideContainer>
        {children}
      </ContentContainer>{" "}
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  height: 90vh;
  padding: 10px;
`;

const SideContainer = styled.div`
  border-right: 1px solid red;

  @media (max-width: 768px) {
    display: none;
  }
`;
