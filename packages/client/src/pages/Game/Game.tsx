import { useState, Fragment } from 'react';
import Modal from '@components/Modal';
import Button from '@components/Button';
import UpArrow from '@icons/up-arrow.svg';
import DownArrow from '@icons/down-arrow.svg';
import LeftArrow from '@icons/left-arrow.svg';
import RightArrow from '@icons/right-arrow.svg';
import SpaceBar from '@icons/space-bar.svg';

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
          <ControlBlock>
            <ControlList>
              <ControlListIrem>
                <span>Движение вперед</span>
                <img alt="Стрелка вверх" src={UpArrow} />
              </ControlListIrem>
              <ControlListIrem>
                <span>Движение назад</span>
                <img alt="Стрелка вниз" src={DownArrow} />
              </ControlListIrem>
              <ControlListIrem>
                <span>Движение влево</span>
                <img alt="Стрелка влево" src={LeftArrow} />
              </ControlListIrem>
              <ControlListIrem>
                <span>Движение вправо</span>
                <img alt="Стрелка вправо" src={RightArrow} />
              </ControlListIrem>
              <ControlListIrem>
                <span>Стрелять</span>
                <img alt="Пробел" src={SpaceBar} />
              </ControlListIrem>
            </ControlList>
            <Button onClick={() => setModalVisible(false)}>Начать</Button>
          </ControlBlock>
        )}
      </Modal>
      <GameComponent />
    </Fragment>
  );
}

export default Game;
