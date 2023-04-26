import { useState, Fragment } from 'react';
import Modal from '@components/Modal';
import Button from '@components/Button';
import ControlBlock from '@components/ControlBlock';

import GameComponent from '../../components/Game';

import {
  SelectModeBlock,
  ControlBlock,
  ControlList,
  ControlListIrem,
} from './styles';

function Game() {
  const [selectedMode, setSelectedMode] = useState<number | undefined>(
    undefined,
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(true);

  return (
    <Fragment key="Game">
      <div>Game</div>
      <Modal isVisible={isModalVisible}>
        {!selectedMode && (
          <SelectModeBlock>
            <Button onClick={() => setSelectedMode(1)}>1 игрок</Button>
            <Button onClick={() => setSelectedMode(2)} disabled>
              2 игрока
            </Button>
          </SelectModeBlock>
        )}
        {selectedMode && (
          <SelectPage>
            <ControlBlock />
            <Button onClick={() => setModalVisible(false)}>Начать</Button>
          </SelectPage>
        )}
      </Modal>
      <GameComponent />
    </Fragment>
  );
}

export default Game;
