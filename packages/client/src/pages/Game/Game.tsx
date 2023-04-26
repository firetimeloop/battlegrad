import { useState, Fragment, useEffect, useCallback } from 'react';
import Modal from '@components/Modal';
import Button from '@components/Button';
import ControlBlock from '@components/ControlBlock';
import { useNavigate } from 'react-router-dom';

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
  const [isPauseModalVisible, setPauseModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const togglePauseMenu = useCallback(() => {
    if (isModalVisible) {
      return;
    }

    setPauseModalVisible(!isPauseModalVisible);
  }, [isModalVisible, isPauseModalVisible]);

  const openPauseMenu = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        togglePauseMenu();
      }
    },
    [togglePauseMenu],
  );

  useEffect(() => {
    window.addEventListener('keyup', openPauseMenu);

    return function () {
      window.removeEventListener('keyup', openPauseMenu);
    };
  }, [openPauseMenu]);

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
      <Modal isVisible={isPauseModalVisible}>
        <PauseMenu>
          <Button onClick={() => console.log('Закончить игру')}>
            Закончить игру
          </Button>
          <Button onClick={() => console.log('Сохранить игру')}>
            Сохранить игру
          </Button>
          <Button onClick={() => navigate('/forum')}>Форум</Button>
          <Button onClick={() => navigate('/profile')}>Профиль</Button>
          <Button onClick={() => navigate('/leaderboard')}>
            Таблица рекордов
          </Button>
        </PauseMenu>
      </Modal>
    </Fragment>
  );
}

export default Game;
