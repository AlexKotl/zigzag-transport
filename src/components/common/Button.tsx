import React from 'react';
import styled from 'styled-components';
import colors from '../../config/colors';

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Button({ children, style }: Props) {
  return <InputButton style={style}>{children}</InputButton>;
}

const InputButton = styled.button`
  background-color: ${colors.primary};
  display: block;
  padding: 13px;
  border-radius: 4px;
  border: 0;
  color: white;
  cursor: pointer;
  font-weight: bold;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }
`;
