import { PropsWithChildren } from 'react';

import { ModalWrapper, ModalContent } from './styles';

type ModalProps = PropsWithChildren<{
  isVisible: boolean;
  toggleModal?: () => void;
  isClosable?: boolean;
}>;

function Modal({ isVisible, children, isClosable, toggleModal }: ModalProps) {
  if (!isVisible) {
    return null;
  }

  const onCloseModalHandler = () => {
    if (!isClosable) {
      return;
    }

    if (toggleModal) {
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
