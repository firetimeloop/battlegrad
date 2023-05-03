import Modal from '@components/Modal';
import Button from '@components/Button';
import ControlBlock from '@components/ControlBlock';

import { SelectModeBlock, SelectPage } from './styles';

type ModalProps = {
  isVisible: boolean;
  selectedMode?: number;
  onSelectMode: (selectedMode: number) => void;
  onCloseModal: () => void;
};

function StartGameModal({
  isVisible,
  selectedMode,
  onSelectMode,
  onCloseModal,
}: ModalProps) {
  return (
    <Modal isVisible={isVisible}>
      {!selectedMode && (
        <SelectModeBlock>
          <Button onClick={() => onSelectMode(1)}>1 игрок</Button>
          <Button onClick={() => onSelectMode(2)} disabled>
            2 игрока
          </Button>
        </SelectModeBlock>
      )}
      {selectedMode && (
        <SelectPage>
          <ControlBlock />
          <Button onClick={onCloseModal}>Начать</Button>
        </SelectPage>
      )}
    </Modal>
  );
}

export default StartGameModal;
