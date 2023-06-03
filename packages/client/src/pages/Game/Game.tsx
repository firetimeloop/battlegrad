import { useState, useEffect, useCallback } from 'react';

import { GameLogo } from '@components/Game/styles';
import BattleGradImage from '@components/Game/styles/BattleGradImage';
import StartGameModal from './components/StartGameModal';
import PauseModal from './components/PauseModal';

import GameComponent from '../../components/Game';

function Game() {
  const [isPauseModalVisible, setPauseModalVisible] = useState<boolean>(false);

  const togglePauseMenu = useCallback(() => {
    setPauseModalVisible(!isPauseModalVisible);
  }, [isPauseModalVisible]);

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

    return () => {
      window.removeEventListener('keyup', openPauseMenu);
    };
  }, [openPauseMenu]);

  return (
    <>
      <GameComponent />
      <StartGameModal />
      <PauseModal isVisible={isPauseModalVisible} />
      <GameLogo>
        <BattleGradImage />
      </GameLogo>
    </>
  );
}

export default Game;
