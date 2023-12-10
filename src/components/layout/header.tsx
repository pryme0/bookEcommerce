import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../store";

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}
export const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [user, setUser] = useState<UserInterface>({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
  });

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const { cart } = useCart();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

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
            <p>Hello {user.firstName}</p>
          </AvatarSection>
        </DrawerHeader>
        <DrawerContent>
          {user ? (
            <>
              <NavLink to="/orders">Orders</NavLink>
              <NavLink to="/cart">Cart</NavLink>
            </>
          ) : (
            <>
              {" "}
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </DrawerContent>
      </DrawerMenu>
      <LeftSection>
        <StyledHamburger color="#fff" onClick={toggleDrawer} size={30} />
        <NavLink to={"/"}>
          <LogoText>VaryOne</LogoText>
        </NavLink>
      </LeftSection>
      <RightSection>
        {user ? (
          <>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/cart">
              <FaShoppingCart size={20} />
              <CartCounter>
                {(cart?.cartItems && cart?.cartItems?.length) || 0}
              </CartCounter>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 50px;
  background: #5a0b4d;
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
  font-weight: 400;
  cursor: pointer;
  color: #fff;
  position: relative;
  &:hover {
    text-decoration: none;
    color: #ffff;
  }
  @media (max-width: 768px) {
    margin: 10px 0;
    font-size: 18px;
    font-weight: 500;
    color: black;
  }
`;

const LogoText = styled.h1`
  font-size: 25px;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
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
  background: #0056b3;
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

const CartCounter = styled.span`
  display: flex;
  position: absolute;
  top: -5px;
  right: -15px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px;
  font-size: 12px;
  font-weight: 700;
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
`;
