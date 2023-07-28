import { CSSProperties, PropsWithChildren } from 'react';

import { ButtonWrapper } from './styles';

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}>;

function Button({ children, disabled, onClick, style }: ButtonProps) {
  return (
    <ButtonWrapper style={style} disabled={disabled} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
