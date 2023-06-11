import styled from 'styled-components';

export const LoginContainer = styled.div`
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

export const LoginBlock = styled.div`
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

const Button = styled.button`
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
