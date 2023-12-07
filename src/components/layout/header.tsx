import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
export const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Container>
      <DrawerMenu isOpen={isDrawerOpen}>
        <DrawerHeader>
          <IoClose
            style={{ alignSelf: "flex-end" }}
            color="#fff"
            size={30}
            onClick={toggleDrawer}
          />
          <AvatarSection>
            <FaCircleUser color="#fff" size={40} />
            <p>Hello Joseph</p>
          </AvatarSection>
        </DrawerHeader>
        <DrawerContent>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signUp">Register</NavLink>
        </DrawerContent>
      </DrawerMenu>
      <LeftSection>
        <StyledHamburger onClick={toggleDrawer} size={30} />
        <LogoText>VaryOne</LogoText>
      </LeftSection>
      <RightSection>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signUp">Register</NavLink>
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 50px;
  background: rgba(149, 174, 171, 0.2);
  padding: 10px 20px;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LeftSection = styled.div`
  display: flex;
  margin-right: auto;
  gap: 10px;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: #544a4a;
  }
  @media (max-width: 768px) {
    margin: 10px 0;
    font-size: 18px;
    font-weight: 500;
  }
`;

const LogoText = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const StyledHamburger = styled(RxHamburgerMenu)`
  color: #333;
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const DrawerMenu = styled.div<{ isOpen: boolean }>`
  background: #fff;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 250px;
  height: 100%;
  background-color: #fff;
  color: black;
  transition: left 0.3s ease-in-out;
  z-index: 1;
  outline: red;
  // padding: 20px 5px;
`;

const DrawerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #232f3e;
  p {
    color: #fff;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
