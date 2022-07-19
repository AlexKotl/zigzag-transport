import React from 'react';
import styled from 'styled-components';
import colors from '../../config/colors';

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  theme?: 'primary' | null;
}

export default function Card({ children, style, className, theme }: Props) {
  return (
    <Container style={style} theme={theme} className={className}>
      {children}
    </Container>
  );
}

const Container = styled.div`
  padding: 30px 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;

  ${(props) =>
    props.theme === 'primary'
      ? `
        background-color: ${colors.primary}; 
        color: ${colors.white}`
      : ''}
`;
