import styled from 'styled-components';
import { BorderedFormBlock } from '../../../styles';

export const ForumBlock = styled(BorderedFormBlock)`
  width: 1000px;

  @media screen and (width <= 1080px) {
    width: 700px;
  }

  @media screen and (width <= 768px) {
    width: 90vw;
  }
`;
