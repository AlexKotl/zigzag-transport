import { useState } from 'react';
import styled from 'styled-components';
import colors from '../config/colors';
import { pathIcon, switchIcon } from '../config/icons';
import sliderImg from '../assets/header-slider-image-1@2x.png';
import Card from './common/Card';
import LocationInput from './common/LocationInput';
import Button from './common/Button';

export default function Search() {
  const [locationFrom, setLocationFrom] = useState(null);
  const [locationTo, setLocationTo] = useState(null);

  const search = (): void => {
    if (locationFrom && locationTo) {
      console.log('navigating');
    } else {
      alert('Please select arrival and destination.');
    }
  };

  return (
    <Container>
      <div style={{ flex: '1 1 0', marginRight: '7vw' }}>
        <img src={sliderImg} alt="" width="100%" />
      </div>
      <Card style={{ flex: '1 1 0' }}>
        <div style={{ padding: '0 10px' }}>
          <SearchTitle>Wähle Deine Pendelroute </SearchTitle>
          <SearchSubtitle>
            um zu sehen, wie viel CO2 Du mit VVS sparen kannst
          </SearchSubtitle>

          <SearchContainer>
            <div style={{ paddingRight: 10, paddingTop: 6 }}>
              <img src={pathIcon} alt="" height="70" />
            </div>
            <div style={{ width: '100%' }}>
              <LocationInput
                placeholder="von : Ort, Haltestelle, Adresse, POI"
                style={{ marginBottom: 20 }}
                onSelect={(id: string) => setLocationFrom(id)}
              />
              <LocationInput
                placeholder="nach : Ort, Haltestelle, Adresse, POI"
                onSelect={(id: string) => setLocationTo(id)}
              />
            </div>
            <div style={{ paddingLeft: 10 }}>
              <img
                src={switchIcon}
                alt=""
                width="28"
                style={{ cursor: 'not-allowed' }}
              />
            </div>
          </SearchContainer>
        </div>

        <Button onClick={search}>Weiter</Button>
      </Card>
    </Container>
  );
}

const Container = styled.section`
  max-width: 734px;
  margin: auto;
  margin-top: -30px;
  display: flex;
  align-items: flex-start;
`;

const SearchTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2em;
  margin-bottom: 6px;
`;
const SearchSubtitle = styled.div`
  color: #666666;
  font-size: 12px;
  font-weight: normal;
  margin-bottom: 25px;
`;

const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 30px;
`;
