import { PropsWithChildren } from 'react';

import { ButtonWrapper } from './styles';

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onClick: () => void;
}>;

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
