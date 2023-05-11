import { PropsWithChildren } from 'react';

import { ModalWrapper, ModalContent } from './styles';

type ModalProps = PropsWithChildren<{
  isVisible: boolean;
  closeModal?: () => void;
}>;

function Modal({ isVisible, children, closeModal }: ModalProps) {
  if (!isVisible) {
    return null;
  }

  const onCloseModalHandler = () => {
    closeModal?.();
  };

  return (
    <ModalWrapper onClick={onCloseModalHandler}>
      <ModalContent>{children}</ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
