import React, { useEffect } from 'react';
import styled from 'styled-components';
import useApi from '../../hooks/useApi';
import { searchLocation } from '../../api/locations';

interface Props {
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function SearchInput({ placeholder, style }: Props) {
  const searchLocationsApi = useApi(searchLocation);

  useEffect(() => {
    searchLocationsApi.request();
  }, []);

  return <Input style={style} type="text" placeholder={placeholder} />;
}

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #e6e6e6;
  padding: 6px 0;
  font-weight: bold;
  width: 100%;

  &::placeholder {
    color: #b4b4b4;
  }

  &:focus {
    outline: none;
  }
`;
