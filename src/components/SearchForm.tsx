import styled from 'styled-components';
import colors from '../config/colors';
import { pathIcon, switchIcon } from '../config/icons';
import sliderImg from '../assets/header-slider-image-1@2x.png';
import Card from './common/Card';
import LocationInput from './common/LocationInput';
import Button from './common/Button';

export default function Search() {
  return (
    <Container>
      <div style={{ flex: '1 1 0', marginRight: '5vw' }}>
        <img src={sliderImg} alt="" width="100%" />
      </div>
      <Card style={{ flex: '1 1 0' }}>
        <div style={{ padding: '0 10px' }}>
          <SearchTitle>Wähle Deine Pendelroute </SearchTitle>
          <SearchSubtitle>
            um zu sehen, wie viel CO2 Du mit VVS sparen kannst
          </SearchSubtitle>

          <SearchContainer>
            <div style={{ paddingRight: 10 }}>
              <img src={pathIcon} alt="" height="74" />
            </div>
            <div>
              <LocationInput
                placeholder="von : Ort, Haltestelle, Adresse, POI"
                style={{ marginBottom: 16 }}
              />
              <LocationInput placeholder="nach : Ort, Haltestelle, Adresse, POI" />
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

        <Button>Weiter</Button>
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
