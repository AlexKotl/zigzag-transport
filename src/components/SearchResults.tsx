import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useApi from '../hooks/useApi';
import { searchTrip } from '../api/locations';
import Card from './common/Card';

interface Props {
  locationFrom: string;
  locationTo: string;
}

export default function SearchResults({ locationFrom, locationTo }: Props) {
  const searchTripApi = useApi(searchTrip);

  // when location changed - update search results
  useEffect(() => {
    if (locationFrom && locationTo) {
      searchTripApi.request(locationFrom, locationTo);
    }
  }, [locationFrom, locationTo]);

  return (
    <div>
      <Card></Card>
    </div>
  );
}
