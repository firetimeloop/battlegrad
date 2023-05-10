import { useNavigate } from 'react-router-dom';

import Modal from '@components/Modal/Modal';
import Button from '@components/Button/Button';

import { PauseMenu } from './styles';

type ModalProps = {
  isVisible: boolean;
};

function PauseModal({ isVisible }: ModalProps) {
  const navigate = useNavigate();

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
        <Button onClick={() => navigate('/forum')}>Форум</Button>
        <Button onClick={() => navigate('/profile')}>Профиль</Button>
        <Button onClick={() => navigate('/leaderboard')}>
          Таблица рекордов
        </Button>
      </PauseMenu>
    </Modal>
  );
}

export default PauseModal;
