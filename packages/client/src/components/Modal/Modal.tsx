import { PropsWithChildren } from 'react';

import { ModalWrapper, ModalContent } from './styles';

type ModalProps = PropsWithChildren<{
  isVisible: boolean;
  className?: string;
  closeModal?: () => void;
}>;

function Modal({ isVisible, children, closeModal, className }: ModalProps) {
  if (!isVisible) {
    return null;
  }

  const onCloseModalHandler = () => {
    closeModal?.();
  };

  return (
    <ModalWrapper className={className} onClick={onCloseModalHandler}>
      <ModalContent>{children}</ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
