import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
        <img src={icon} alt="" style={{ marginRight: 7 }} />
        {title}
      </Title>
      <Emission>{emission || <Skeleton count={2} />}</Emission>
      {emission && (
        <Tip theme={theme}>
          CO<sub>2</sub> / Jahr
        </Tip>
      )}
    </Container>
  );
}

const Container = styled(Card)`
  flex: 1 1 0;
  margin: 0 7px;
  padding: 15px;
`;

const Title = styled.div`
  display: flex;
`;

const Emission = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

const Tip = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: ${(props) => (props.theme === 'primary' ? colors.white : '#666')};
`;
