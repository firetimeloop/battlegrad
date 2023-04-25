import { ReactNode } from 'react';

import { ModalWrapper, ModalContent } from './styles';

type ModalProps = {
  isVisible: boolean;
  toggleModal?: () => void;
  children: ReactNode;
  isClosable?: boolean;
};

function Modal({ isVisible, children, isClosable, toggleModal }: ModalProps) {
  if (!isVisible) {
    return null;
  }

  const onCloseModalHandler = () => {
    if (!isClosable) {
      return;
    }

    if (typeof toggleModal === 'function') {
      toggleModal();
    }
  };

  return (
    <ModalWrapper onClick={onCloseModalHandler}>
      <ModalContent>{children}</ModalContent>
    </ModalWrapper>
  );
}

Modal.defaultProps = {
  isClosable: true,
};

export default Modal;
