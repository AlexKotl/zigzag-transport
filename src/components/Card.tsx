import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function Card({ children, ...props }: Props) {
  return <div>{children}</div>;
}
