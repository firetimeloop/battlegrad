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

export const FullScreenCenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  width: 430px;
`;

export const BorderedFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  width: 600px;
  padding: 51px 85px 48px;
  background: ${({ theme }) => theme.color.white};
  border: ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 12px;

  a {
    font-family: Inter, serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    text-decoration-line: underline;
    color: ${({ theme }) => theme.color.text.link};
  }

  a:visited {
    color: ${({ theme }) => theme.color.text.link};
  }
`;

export const Button = styled.button`
  font-family: Inter, serif;
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
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.background.blue};
`;

export const OauthButton = styled(SubmitButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${({ theme }) => theme.color.text.primary};
  background: ${({ theme }) => theme.color.white};
  border: 1px solid black;
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
  gap: 10px;
`;

export const DividerMargin5 = styled.div`
  width: 100%;
  height: 1px;
  margin: 5px 0;
  background: ${({ theme }) => theme.color.text.secondary};
`;

export const DividerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  align-items: center;
  gap: 24px;
`;
export const DividerText = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #85889E;
`;

export const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: #DADDEE;
`;
