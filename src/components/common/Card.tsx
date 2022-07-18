import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card({ children, style }: Props) {
  return <Container style={style}>{children}</Container>;
}

const Container = styled.div`
  padding: 30px 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;
