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

export const TopicList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`;

export const TopicListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 0;
`;
export const TopicTitle = styled.h2`
  display: flex;
`;

export function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
      <path d="m480-160-42-43 247-247H160v-60h525L438-757l42-43 320 320-320 320Z" />
    </svg>
  );
}
