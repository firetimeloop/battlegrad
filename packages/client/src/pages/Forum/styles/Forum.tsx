import styled from 'styled-components';
import { ModalContent } from '@components/Modal/styles';
import {
  BorderedFormBlock,
  BtnText,
  Button,
  ColumnGap10,
  FormContainer,
  H1,
  Input,
  RowGap10,
  RowSpaceBetween,
  SubmitButton,
} from '../../../styles';

export const ForumBlock = styled(BorderedFormBlock)`
  width: 1000px;
  position: relative;
  padding: 75px 35px 30px;
  color: ${({ theme }) => theme.colors.onBackground};

  @media screen and (width <= 1080px) {
    width: 700px;
  }

  @media screen and (width <= 768px) {
    width: 90vw;
  }

  ${FormContainer} {
    width: 100%;
  }
`;

export const ForumMessageForm = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  gap: 20px;
  ${Input} {
    width: 100%;
    padding: 10px;
  }
  ${ColumnGap10} {
    width: 100%;
    max-width: 500px;
  }
  
  ${SubmitButton} {
    width: fit-content;
    padding: 10px;
    height: 48px;
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
  padding: 10px 20px 10px 0;
`;
export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 60vh;
  overflow-y: scroll;
  width: 100%;
`;
export const EmptyText = styled.p`
  margin: 100px 0;
  font-size: 18px
`;
export const ReplyButton = styled(Button)`
  padding: 6px 8px;
  height: fit-content;
  font-size: 14px;
`;
export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 10px 0;
  width: 100%;

  p {
    margin: 20px;
  }
  ${FormContainer} {
    width: 100%;
    margin-top: 5px;
  }
  ${RowSpaceBetween} {
    width: 100%;
    gap: 20px;
  }
  ${ColumnGap10} {
    width: 100%;
  }
  ${Input} {
    padding: 6px;
  }
  ${Button} {
    width: fit-content;
    height: 38px;
  }
  ${ReplyButton} {
    height: fit-content;
  }
  ${SubmitButton} {
    padding: 6px;
    
  }
`;
export const CommentAuthor = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
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
export const ForumTitle = styled(H1)`
  font-size: 30px;
  line-height: 30px;
  white-space: nowrap;
`;
export const GoBackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 30px;
  top: 30px;
  cursor: pointer;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.accent};
`;
export const DeleteTopicContainer = styled.div`
  display: flex;
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.accent};
`;

export const CommentsBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${FormContainer} {
    width: 100%;
    gap: 20px;
    align-items: start;
  }
  ${RowGap10} {
    width: 100%;
  }
  ${ColumnGap10} {
    width: 100%;
  }
  ${Input} {
    width: 100%;
    padding: 10px;
  }
  ${SubmitButton} {
    width: fit-content;
    padding: 10px;
    height: 48px;
  }
`;
export const DeleteTopicOverlay = styled.div`
  ${ModalContent} {
    padding: 0;
  }

  ${RowSpaceBetween} {
    margin-top: 10px;
  }

  ${Button} {
    padding: 10px;
  }
  ${SubmitButton} {
    height: 28px;
    margin-left: 20px;
    padding: 20px;
    background: ${({ theme }) => theme.colors.accent};
  }

  .modal-overlay {
    background: rgb(0 0 0 / 15%);
    inset: 0;
    transform: none;
  }
`;

export const ReplyForm = styled.div`
  display: flex;
  align-items: start;
  gap: 20px;
  width: 100%;
  ${Input} {
    padding: 3px 8px;
  }
  ${ColumnGap10} {
    width: fit-content;
  }
  ${Button} {
    padding: 6px;
    font-size: 15px;
    height: fit-content;
  }
  ${BtnText} {
    font-size: 15px;
  }
  
`;
export function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24">
      <path
        fill="currentColor"
        d="m480-160-57-56 224-224H160v-80h487L423-744l57-56 320 320-320 320Z" />
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
      <path
        fill="currentColor"
        d="M440-200v-240H200v-80h240v-240h80v240h240v80H520v240h-80Z" />
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
      <path
        fill="currentColor"
        d="M480-160 160-480l320-320 57 56-224 224h487v80H313l224 224-57 56Z" />
    </svg>
  );
}
