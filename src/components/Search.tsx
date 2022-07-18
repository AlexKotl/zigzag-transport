import styled from 'styled-components';
import colors from '../config/colors';
import sliderImg from '../assets/header-slider-image-1@2x.png';
import Card from './Card';

export default function Search() {
  return (
    <Container>
      <div>
        <img src={sliderImg} alt="" width="100%" />
      </div>
      <Card>Search Form here</Card>
    </Container>
  );
}

const Container = styled.section`
  max-width: 734px;
  margin: auto;
  margin-top: -30px;
`;
