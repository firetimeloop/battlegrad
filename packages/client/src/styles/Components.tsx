import styled from 'styled-components';
import { Field } from 'formik';

export const Input = styled(Field)`
  font-family: Inter,serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.text.primary};
  padding: 25px 32px;
  border-radius: 60px;
  border: ${({ theme }) => theme.border};
  width: 100%;
  max-width: 500px;
  
  ::placeholder {
    font-family: Inter,serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    color: ${({ theme }) => theme.color.text.secondary}
  }
  
`;
