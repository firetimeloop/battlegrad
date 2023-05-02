import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text.primary};
  margin: 0;
`;
