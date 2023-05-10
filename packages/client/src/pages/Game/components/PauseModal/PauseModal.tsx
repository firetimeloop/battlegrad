import Modal from '@components/Modal/Modal';
import Button from '@components/Button/Button';
import LinkButton from '@components/LinkButton';

import { PauseMenu } from './styles';

type ModalProps = {
  isVisible: boolean;
};

function PauseModal({ isVisible }: ModalProps) {
  const finishGameHandler = () => {
    console.log('Закончить игру');
  };

  const saveGameHandler = () => {
    console.log('Сохранить игру');
  };

  return (
    <Modal isVisible={isVisible}>
      <PauseMenu>
        <Button onClick={finishGameHandler}>Закончить игру</Button>
        <Button onClick={saveGameHandler}>Сохранить игру</Button>
        <LinkButton to="/forum">Форум</LinkButton>
        <LinkButton to="/profile">Профиль</LinkButton>
        <LinkButton to="/leaderboard">Таблица рекордов</LinkButton>
      </PauseMenu>
    </Modal>
  );
}

export default PauseModal;
