import styled from 'styled-components';

export const AlertContainer = styled.div<{visible: boolean | undefined}>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  max-width: 500px;
  padding: 16px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.onSurface};
  position: fixed;
  z-index: 2;
  font-size: 18px;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;
