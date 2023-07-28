import styled from 'styled-components';
import {
  FormContainer,
  BorderedFormBlock,
  SubmitButton,
} from '../../../styles';

export const RegisterBlock = styled.div`
  display: flex;
  align-items: stretch;
  width: 800px;
  border-radius: 12px;
  overflow: hidden;
`;
export const RegisterImage = styled.div`
  display: flex;
  width: 300px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${({ theme }) => {
    if (theme.name === 'darkTheme') {
      return "url('/tank-bg-light.png')";
    }
    return "url('/tank-bg-dark.png')";
  }};
  background-color: ${({ theme }) => theme.colors.background};
`;
export const RegisterBlockContent = styled(BorderedFormBlock)`
  border: none;
  box-shadow: none;
  border-radius: 0;
  width: 500px;
`;
export const RegisterForm = styled(FormContainer)`
  gap: 8px;

  input {
    padding: 12px 32px;
  }

  a,
  ${SubmitButton} {
    margin-top: 10px;
  }
`;
