import Modal from '@components/Modal';
import Button from '@components/Button';
import ControlBlock from '@components/ControlBlock';

import { GameStatus, PlayersMode, setGameStatus, setPlayersMode } from '@components/Game/slice';
import { SelectModeBlock, SelectPage } from './styles';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

function StartGameModal() {
  const { playersMode, status } = useAppSelector((store) => store.game);
  const dispatch = useAppDispatch();
  return (
    <Modal isVisible={status === GameStatus.showControls}>
      {playersMode !== null
        ? (
          <SelectPage>
            <ControlBlock />
            <Button onClick={() => dispatch(setGameStatus(GameStatus.normal))}>
              Начать
            </Button>
          </SelectPage>
        )
        : (
          <SelectModeBlock>
            <Button onClick={() => dispatch(setPlayersMode(PlayersMode.single))}>
              1 игрок
            </Button>
            <Button
              data-test-id="my-btn-2"
              onClick={() => dispatch(setPlayersMode(PlayersMode.multiplayer))}
              disabled>
              2 игрока
            </Button>
          </SelectModeBlock>
        )}
    </Modal>
  );
}

export default StartGameModal;
