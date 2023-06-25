import styled from 'styled-components';
import { Field } from 'formik';

export const Input = styled(Field)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.onSurface};
  padding: 25px 32px;
  border-radius: 60px;
  width: 100%;
  max-width: 500px;

  ::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.onSurface};
  }
`;

export const FullScreenCenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  width: 430px;
  color: ${({ theme }) => theme.colors.onBackground};
`;

export const BorderedFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  width: 600px;
  padding: 51px 85px 48px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;

  a {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    text-decoration-line: underline;
    color: ${({ theme }) => theme.colors.accent};
  }

  a:visited {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Button = styled.button`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  border: none;
  cursor: pointer;

  :hover {
    filter: brightness(0.95);
  }

  :active {
    filter: brightness(0.9);
  }
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  border-radius: 60px;
  max-width: 500px;
  padding: 25px 0;
  color: ${({ theme }) => theme.colors.onAccent};
  background: ${({ theme }) => theme.colors.accent};
`;

export const BtnText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
`;

export const LoaderBtnContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RowGap10 = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 10px;
  color: ${({ theme }) => theme.colors.onBackground};

  & h3 {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 5px 0;
  background: ${({ theme }) => theme.colors.secondary};
`;
