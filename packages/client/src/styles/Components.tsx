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

export const RepliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-left: 1px solid #DADADA;
  margin-left: 10px;
  margin-top: 5px;
  padding-left: 10px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  padding: 4px 8px;

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

export const OauthButton = styled(SubmitButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.onBackground};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid black;
`;

export const BtnText = styled.div<{hidden?: boolean}>`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  white-space: nowrap;
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
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

export const ColumnGap10 = styled(RowGap10)`
  flex-direction: column;
`;

export const RowSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #DADDEE;
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
