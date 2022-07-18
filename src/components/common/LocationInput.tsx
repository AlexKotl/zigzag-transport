import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { stopIcon } from '../../config/icons';
import useApi from '../../hooks/useApi';
import { searchLocation } from '../../api/locations';

interface Props {
  placeholder?: string;
  style?: React.CSSProperties;
}

interface ILocation {
  id: string;
  disassembledName: string;
  matchQuality: number;
}

export default function SearchInput({ placeholder, style }: Props) {
  const searchLocationsApi = useApi(searchLocation);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');

  const change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const data = await searchLocationsApi.request(e.target.value);

    // sort by best match
    console.log(data.locations);
    data.locations.sort(
      (l1: ILocation, l2: ILocation) => l2.matchQuality - l1.matchQuality
    );
    console.log(data.locations);

    // prepare suggestions list and limit it
    setSuggestions(
      data.locations
        .map((location: ILocation) => location.disassembledName)
        .slice(0, 20)
    );
  };

  return (
    <Container style={style}>
      <Input
        type="text"
        value={query}
        onChange={change}
        placeholder={placeholder}
      />
      {suggestions && (
        <Suggestions>
          {suggestions.map((suggestion: string, index: number) => (
            <SuggestionsItem key={index}>
              <img
                src={stopIcon}
                width="16"
                style={{ marginRight: 12 }}
                alt=""
              />
              {suggestion}
            </SuggestionsItem>
          ))}
        </Suggestions>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
`;

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

const Suggestions = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #eee;
  padding: 0 16px;
  z-index: 5;
`;

const SuggestionsItem = styled.div`
  display: flex;
  cursor: pointer;
  padding: 5px 10px;
  line-height: 20px;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #efefef;
  }
`;
