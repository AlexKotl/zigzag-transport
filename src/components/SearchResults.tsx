import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { carIcon, carSmallIcon, busIcon, logoIcon } from '../config/icons';
import colors from '../config/colors';
import breakpoints from '../config/breakpoints';
import useApi from '../hooks/useApi';
import { searchTrip } from '../api/locations';
import Card from './elements/Card';
import CardEmission from './elements/CardEmission';

interface Props {
  locationFrom: string;
  locationTo: string;
}

// helper function to format string values for distance and emission
const metersToString = (distance: number) =>
  (Math.round(distance / 10) / 100).toString() + ' km';
const emissionToString = (emission: number) =>
  (Math.round(emission * 100) / 100).toString() + ' kg';

export default function SearchResults({ locationFrom, locationTo }: Props) {
  const searchTripApi = useApi(searchTrip);
  const [emission, setEmission] = useState('');
  const [emissionCar, setEmissionCar] = useState('');
  const [distance, setDistance] = useState('');
  const [distanceCar, setDistanceCar] = useState('');

  // when location changed - update search results
  useEffect(() => {
    // use async function in effect trick
    const fetchData = async () => {
      const data = await searchTripApi.request(locationFrom, locationTo);

      // handle errors from api - if exists - display to user
      if (data.systemMessages?.length > 0) {
        const message = data.systemMessages
          .filter((message: any) => message.type === 'error' && message.text)
          .reduce((cur: any, next: any) => cur.text + '\n' + next.text, {
            text: ''
          });
        if (message) {
          alert(message);
          return;
        }
      }

      // calculate required data from api response
      let sumEmission = 0,
        sumEmissionCar = 0,
        sumDistance = 0,
        sumDistanceCar = 0;

      data.journeys?.forEach((journey: any) => {
        journey.legs?.forEach((leg: any) => {
          // find prop name, as it may be variable like CO2Emission_Actual_Stadtbahn
          if (!leg.properties) return;

          const propName = Object.keys(leg.properties).find(
            (p: string) => p.indexOf('CO2Emission_Actual') !== -1
          );
          if (propName) {
            // TODO refactor this
            if (leg.transportation?.product?.name === 'Auto') {
              sumEmissionCar += parseFloat(leg.properties[propName]);
              sumDistanceCar += leg.distance || 0;
            } else {
              sumEmission += parseFloat(leg.properties[propName]);
              sumDistance += leg.distance || 0;
            }
          }
        });
      });

      setEmission(emissionToString(sumEmission));
      setEmissionCar(emissionToString(sumEmissionCar));
      setDistance(metersToString(sumDistance));
      setDistanceCar(metersToString(sumDistanceCar));
    };
    if (locationFrom && locationTo) {
      fetchData();
    }
  }, [locationFrom, locationTo]);

  return (
    <Container>
      <HeaderCard>
        <HeaderCardItem>
          <img src={carIcon} alt="" />
          <div>{distanceCar || <Skeleton />}</div>
        </HeaderCardItem>
        <HeaderDelimiter />
        <HeaderCardItem
          style={{
            color: colors.white,
            backgroundColor: colors.primary
          }}
        >
          <img src={busIcon} alt="" />
          <div>{distance || <Skeleton />}</div>
        </HeaderCardItem>
      </HeaderCard>

      <CardsContainer>
        <div style={{ flex: '1 1 0' }}>
          <Title>Auswirkungen auf die Umwelt</Title>
          <ResultCards>
            <CardEmission
              icon={carSmallIcon}
              title="Auto"
              emission={emission}
            />
            <CardEmission
              icon={logoIcon}
              title="VVS Abo"
              emission={emissionCar}
              theme="primary"
            />
          </ResultCards>
          <Link href="#">Wie entstehen diese Werte?</Link>
        </div>

        <div style={{ flex: '1 1 0' }}>
          <Title>Kosteneinsch??tzung f??r ein Jahr</Title>
          <ResultCards>
            <CardEmission />
            <CardEmission theme={'primary'} />
          </ResultCards>
        </div>
      </CardsContainer>
    </Container>
  );
}

const flipInAnimation = keyframes`
  ${flipInX}
`;

const Container = styled.div`
  flex: 1 1 0;
  padding: 0 10px;
`;

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

const CardsContainer = styled.div`
  max-width: 734px;
  margin: auto;
  margin-top: 35px;
  display: flex;
  animation: 1s ${flipInAnimation};

  @media (max-width: ${breakpoints.screenXs}px) {
    flex-direction: column;
  }
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
