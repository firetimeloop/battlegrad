import styled from 'styled-components';

export const ModalWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0 0 0 / 40%);
  position: fixed;
  top: 0;
  left: 0;
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
