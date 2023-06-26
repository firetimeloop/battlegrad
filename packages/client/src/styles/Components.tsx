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
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.background.blue};
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
  gap: 10px;
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
  margin: 5px 0;
  background: ${({ theme }) => theme.color.text.secondary};
`;
