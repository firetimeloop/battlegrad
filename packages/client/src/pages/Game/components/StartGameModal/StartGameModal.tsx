import Modal from '@components/Modal';
import Button from '@components/Button';
import ControlBlock from '@components/ControlBlock';

import { SelectModeBlock, SelectPage } from './styles';

type ModalProps = {
  isVisible: boolean;
  selectedMode?: number;
  // eslint-disable-next-line no-unused-vars
  onSelectMode: (selectedMode: number) => void;
  onCloseModal: () => void;
};

function StartGameModal({
  isVisible,
  selectedMode,
  onSelectMode,
  onCloseModal,
}: ModalProps) {
  const selectSingleModeHandler = () => {
    onSelectMode(1);
  };

  const selectDoubleModeHandler = () => {
    onSelectMode(2);
  };

  return (
    <Modal isVisible={isVisible}>
      {!selectedMode && (
        <SelectModeBlock>
          <Button onClick={selectSingleModeHandler}>1 игрок</Button>
          <Button
            data-test-id="my-btn-2"
            onClick={selectDoubleModeHandler}
            disabled>
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
