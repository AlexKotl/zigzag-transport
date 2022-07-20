import React from 'react';
import styled from 'styled-components';
import colors from '../config/colors';

interface Props {
  onBack: (() => void) | null;
}

export default function PageHeader({ onBack }: Props) {
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
        {onBack && <BackButton onClick={onBack}>‹ Back</BackButton>}
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background-color: #f6f6f6;
  padding-top: 14px;
`;

const Container = styled.div`
  max-width: 734px;
  margin: auto;
  padding-bottom: 70px;
`;

const Breadcrumbs = styled.div`
  font-size: 12px;
  line-height: 24px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
`;

const BackButton = styled.a`
  color: #666;
  text-decoration: underline;
  margin-top: 10px;
  display: block;
`;
