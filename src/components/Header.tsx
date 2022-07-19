import React from 'react';
import styled from 'styled-components';
import logo from '../assets/vvs-logo.svg';
import colors from '../config/colors';

export default function Header() {
  return (
    <Container>
      <Menu>
        <MenuElement />
        <MenuElement />
        <MenuElement />
      </Menu>
      <Logo>
        <img src={logo} style={{ display: 'block' }} width={48} />
      </Logo>
    </Container>
  );
}

const Container = styled.header`
  background-color: ${colors.primary};
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  width: 32px;
  cursor: pointer;

  &:hover div {
    background-color: lightgray;
  }
`;

const MenuElement = styled.div`
  height: 4px;
  border-radius: 3px;
  margin: 7px 0;
  background-color: ${colors.white};
`;

const Logo = styled.div``;
