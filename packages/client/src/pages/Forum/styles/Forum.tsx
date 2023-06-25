import styled from 'styled-components';
import { BorderedFormBlock } from '../../../styles';

export const ForumBlock = styled(BorderedFormBlock)`
  width: 1000px;
  position: relative;

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

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 0;
`;
export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 60vh;
  overflow-y: scroll;
`;
export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
export const CommentAuthor = styled.div`
  display: flex;
  gap: 10px;
`;

export const CommentAuthorAvatarContainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;
export const CommentAuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: scale-down;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const TopicTitle = styled.h2`
  display: flex;
`;
export const GoBackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
`;

export function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24">
      <path d="m480-160-57-56 224-224H160v-80h487L423-744l57-56 320 320-320 320Z" />
    </svg>
  );
}

export function Plus() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24">
      <path d="M440-200v-240H200v-80h240v-240h80v240h240v80H520v240h-80Z" />
    </svg>
  );
}

export function GoBack() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24">
      <path d="M480-160 160-480l320-320 57 56-224 224h487v80H313l224 224-57 56Z" />
    </svg>
  );
}
