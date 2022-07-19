import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { carIcon, carSmallIcon, busIcon, logoIcon } from '../config/icons';
import useApi from '../hooks/useApi';
import { searchTrip } from '../api/locations';
import Card from './common/Card';
import CardEmission from './common/CardEmission';
import colors from '../config/colors';

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
      <HeaderCard>
        <HeaderCardItem>
          <img src={carIcon} alt="" />
          <div>0 km</div>
        </HeaderCardItem>
        <HeaderDelimiter />
        <HeaderCardItem
          style={{
            color: colors.white,
            backgroundColor: colors.primary
          }}
        >
          <img src={busIcon} alt="" />
          <div>0 km</div>
        </HeaderCardItem>
      </HeaderCard>

      <Container>
        <div style={{ flex: '1 1 0' }}>
          <Title>Auswirkungen auf die Umwelt</Title>
          <ResultCards>
            <CardEmission />
            <CardEmission theme="primary" />
          </ResultCards>
          <Link href="#">Wie entstehen diese Werte?</Link>
        </div>

        <div style={{ flex: '1 1 0' }}>
          <Title>Kosteneinschätzung für ein Jahr</Title>
          <ResultCards>
            <CardEmission />
            <CardEmission theme={'primary'} />
          </ResultCards>
        </div>
      </Container>
    </div>
  );
}

const HeaderCard = styled(Card)`
  display: flex;
  padding: 0;
  font-size: 14px;
  margin: auto;
  margin-top: -30px;
  max-width: 540px;
  overflow: hidden;
  text-align: center;
`;

const HeaderCardItem = styled.div`
  flex: 1 1 0;
  padding: 7px;
`;

// triangle delimiter
const HeaderDelimiter = styled.div`
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-top: 78px solid ${colors.primary};
`;

const Container = styled.div`
  max-width: 734px;
  margin: auto;
  margin-top: 35px;
  display: flex;
`;

const ResultCards = styled.div`
  display: flex;
  margin-top: 25px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const Link = styled.a`
  color: ${colors.primary};
  font-size: 14px;
  display: block;
  margin-top: 10px;
  float: right;
`;
