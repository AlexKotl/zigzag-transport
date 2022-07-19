import styled from 'styled-components';
import colors from '../../config/colors';
import Card from './Card';

interface Props {
  title?: string;
  emission?: string;
  icon?: string;
  theme?: 'primary' | null;
}

export default function CardEmission({ title, emission, icon, theme }: Props) {
  return (
    <Container theme={theme}>
      <Title>
        <img src={icon} alt="" />
        {title}
      </Title>
      <Emission>{emission}</Emission>
      <Tip theme={theme}>
        CO<sub>2</sub> / Jahr
      </Tip>
    </Container>
  );
}

const Container = styled(Card)`
  flex: 1 1 0;
  margin: 0 7px;
`;

const Title = styled.div`
  disaply: flex;
`;

const Emission = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Tip = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: ${(props) => (props.theme === 'primary' ? colors.white : '#666')};
`;
