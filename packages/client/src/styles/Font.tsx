import styled from 'styled-components';

export const H2 = styled.div`
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.text.primary}
`;
