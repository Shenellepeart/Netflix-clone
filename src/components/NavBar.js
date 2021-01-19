import React, { useEffect, useState } from "react";
import styled from "styled-components";
import netflixLogo from "../images/netflix-logo.png" 

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px;
  height: 30px;
  z-index: 1;

  transition-timing-function: ease-in;
  transition: all 0.5s;

  background-color: ${({ show }) => (show ? "#111" : "")};
`;

const NavLogo = styled.img`
  position: fixed;
  left: 20px;
  object-fit: contain;
  width: 80px;
`;

const UserAvatar = styled.img` 
  position: fixed;
  right: 20px;
  object-fit: contain;
  width: 30px;
`;

const NavBar = () => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    const scrollFunction = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    }
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <Wrapper show={show}>
      <NavLogo
        src={netflixLogo}
        alt="Netflix Logo"
      />
      <UserAvatar
        src="https://occ-0-853-851.1.nflxso.net/dnm/api/v6/0RO1pLmU93-gdXvuxd_iYjzPqkc/AAAABQEHcupcLsyp9pvv_0DT4A4U1X863Oy1_gnD4cHGuijhbBKlaiPgKLsEpNakLimTY9GqLaxxwuaHgFPrY8GyAX1e3jwq.png?r=abe."
        alt="User Avatar"
      />
    </Wrapper>
  );
};

export default NavBar;
