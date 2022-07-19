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

// helper function to convert to km: 1250 => 1.25 km
const metersToString = (distance: number) =>
  (Math.round(distance / 10) / 100).toString() + ' km';

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
          .reduce((cur: any, next: any) => cur.text + '\n' + next.text, '');
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
          const propName = Object.keys(leg.properties).find(
            (p: string) => p.indexOf('CO2Emission_Actual') !== -1
          );
          if (propName) {
            if (leg.transportation?.product?.name === 'Auto') {
              sumEmissionCar += parseFloat(leg.properties[propName]);
              sumDistanceCar += leg.distance;
            } else {
              sumEmission += parseFloat(leg.properties[propName]);
              sumDistance += leg.distance;
            }
          }
        });
      });

      setEmission(sumEmission.toString() + ' kg');
      setEmissionCar(sumEmissionCar.toString() + ' kg');
      setDistance(metersToString(sumDistance));
      setDistanceCar(metersToString(sumDistanceCar));
    };
    if (locationFrom && locationTo) {
      fetchData();
    }
  }, [locationFrom, locationTo]);

  return (
    <div>
      <HeaderCard>
        <HeaderCardItem>
          <img src={carIcon} alt="" />
          <div>{distanceCar}</div>
        </HeaderCardItem>
        <HeaderDelimiter />
        <HeaderCardItem
          style={{
            color: colors.white,
            backgroundColor: colors.primary
          }}
        >
          <img src={busIcon} alt="" />
          <div>{distance}</div>
        </HeaderCardItem>
      </HeaderCard>

      <Container>
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
