import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  color: ${({ theme }) => theme.colors.onAccent};
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 60px;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  border: none;
  cursor: pointer;
  padding: 10px 20px;

  :hover {
    filter: brightness(0.95);
  }

  :active {
    filter: brightness(0.9);
  }

  :disabled {
    filter: brightness(0.8);
  }
`;
