import React, { ReactNode } from "react";
import styled from "styled-components";
import { Footer } from "./footer";
import { Header } from "./header";
import { SideBar } from "../sidebar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <ContentContainer>
        <SideContainer>
          <SideBar />
        </SideContainer>
        {children}
      </ContentContainer>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
`;

const SideContainer = styled.div`
  border-right: 1px solid red;
  display: flex;
  max-width: 15%;
  padding: 40px 10px;
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`;
