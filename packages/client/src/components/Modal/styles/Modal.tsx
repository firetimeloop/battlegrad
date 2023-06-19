import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  width: fit-content;
`;
