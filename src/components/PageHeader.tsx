import React from 'react';
import styled from 'styled-components';
import colors from '../config/colors';

export default function PageHeader() {
  return (
    <Section>
      <Container>
        <Breadcrumbs>
          <a href="#">Rundum mobil</a> /{' '}
          <a href="#">Preis- und Umweltvergleich</a>
        </Breadcrumbs>
        <Title>Umweltrechner</Title>
        <SubTitle>
          Umwelt und Preisvergleich zwischen VVS und Deinem Auto
        </SubTitle>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background-color: #f6f6f6;
`;

const Container = styled.div`
  max-width: 734px;
  margin: auto;
  padding-bottom: 100px;
`;

const Breadcrumbs = styled.div`
  font-size: 12px;
  line-height: 24px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;
const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
`;
