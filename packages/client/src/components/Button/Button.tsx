import { ReactNode } from 'react';

import { ButtonWrapper } from './styles';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <ButtonWrapper disabled={disabled} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
