import { useState, useEffect, useCallback } from 'react';

import { GameLogo } from '@components/Game/styles';
import StartGameModal from './components/StartGameModal';
import PauseModal from './components/PauseModal';

import GameComponent from '../../components/Game';

function Game() {
  const [selectedMode, setSelectedMode] = useState<number | undefined>(
    undefined,
  );
  const [isStartGameModalVisible, setStartGameModalVisible] =
    useState<boolean>(true);
  const [isPauseModalVisible, setPauseModalVisible] = useState<boolean>(false);

  const togglePauseMenu = useCallback(() => {
    if (isStartGameModalVisible) {
      return;
    }

    setPauseModalVisible(!isPauseModalVisible);
  }, [isStartGameModalVisible, isPauseModalVisible]);

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

  const closeStartGameModalHandler = () => {
    setStartGameModalVisible(false);
  };

  return (
    <>
      {!isStartGameModalVisible && <GameComponent />}
      <StartGameModal
        isVisible={isStartGameModalVisible}
        onCloseModal={closeStartGameModalHandler}
        onSelectMode={setSelectedMode}
        selectedMode={selectedMode}
      />
      <PauseModal isVisible={isPauseModalVisible} />
      <GameLogo />
    </>
  );
}

export default Game;
