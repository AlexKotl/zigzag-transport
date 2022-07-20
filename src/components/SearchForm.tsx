import { CSSProperties, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import colors from '../config/colors';
import breakpoints from '../config/breakpoints';
import { pathIcon, switchIcon } from '../config/icons';
import sliderImg from '../assets/header-slider-image-1@2x.png';
import Card from './elements/Card';
import LocationInput from './elements/LocationInput';
import Button from './elements/Button';

interface Props {
  onSearch: (from: string, to: string) => void;
  style?: React.CSSProperties;
}

export default function Search({ onSearch, style }: Props) {
  const [locationFrom, setLocationFrom] = useState(null);
  const [locationTo, setLocationTo] = useState(null);

  const search = (): void => {
    if (true || (locationFrom && locationTo)) {
      onSearch(locationFrom, locationTo);
    } else {
      alert('Please select origin and destination locations.');
    }
  };

  return (
    <Section>
      <Container style={style}>
        <Slider>
          <img src={sliderImg} alt="" width="100%" />
        </Slider>
        <Card style={{ flex: '1 1 0' }}>
          <div style={{ padding: '0 10px' }}>
            <SearchTitle>Wähle Deine Pendelroute </SearchTitle>
            <SearchSubtitle>
              um zu sehen, wie viel CO2 Du mit VVS sparen kannst
            </SearchSubtitle>

            <SearchContainer style={{}}>
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
    </Section>
  );
}

const flipInAnimation = keyframes`
  ${flipInX}
`;

const Section = styled.section`
  position: absolute;
  width: 100%;
  animation: 1s ${flipInAnimation};
  padding: 0 10px;
`;
const Container = styled.div`
  max-width: 734px;
  margin: auto;
  margin-top: -30px;
  display: flex;
  align-items: flex-start;
  flex: 1 1 0;
`;

const Slider = styled.div`
  flex: 1 1 0;
  margin-right: 7vw;

  @media (max-width: ${breakpoints.screenXs}px) {
    display: none;
  }
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
