import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  color: white;
  background-color: #3369f3;
  border-radius: 60px;
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 500;
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
