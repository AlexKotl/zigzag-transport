import React, { useState } from 'react';
import styled from 'styled-components';
import { stopIcon, loadingIcon } from '../../config/icons';
import useApi from '../../hooks/useApi';
import { searchLocation } from '../../api/locations';

interface Props {
  placeholder?: string;
  style?: React.CSSProperties;
  onSelect: (id: string) => void;
}

interface ILocation {
  id: string;
  disassembledName: string;
  matchQuality: number;
}

export default function SearchInput({ placeholder, style, onSelect }: Props) {
  const searchLocationsApi = useApi(searchLocation);
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const [query, setQuery] = useState('');

  const change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setHideSuggestions(false);
    const data = await searchLocationsApi.request(e.target.value);

    // sort by best match
    data.locations.sort(
      (l1: ILocation, l2: ILocation) => l2.matchQuality - l1.matchQuality
    );

    // prepare suggestions list and limit it
    setSuggestions(
      data.locations
        .filter((location: ILocation) => location.disassembledName?.length > 0)
        .slice(0, 20)
    );
  };

  const selectItem = (id: string, name: string) => {
    setQuery(name);
    setHideSuggestions(true);
    onSelect(id);
  };

  return (
    <Container style={style}>
      <Input
        type="text"
        value={query}
        onChange={change}
        placeholder={placeholder}
      />
      {!hideSuggestions && suggestions.length > 0 && (
        <Suggestions>
          {searchLocationsApi.loading && <Loading src={loadingIcon} />}
          {suggestions.map((location: ILocation, index: number) => (
            <SuggestionsItem
              key={index}
              onClick={() => selectItem(location.id, location.disassembledName)}
            >
              <img
                src={stopIcon}
                width="16"
                style={{ marginRight: 12 }}
                alt=""
              />
              {location.disassembledName}
            </SuggestionsItem>
          ))}
        </Suggestions>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  position: relative;
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
  z-index: 5;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
`;

const SuggestionsItem = styled.div`
  display: flex;
  cursor: pointer;
  padding: 7px 12px;
  line-height: 20px;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #efefef;
  }
`;

const Loading = styled.img`
  position: absolute;
  right: 2px;
  top: 2px;
  width: 30px;
`;
