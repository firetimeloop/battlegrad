import UpArrow from '@icons/up-arrow.svg';
import DownArrow from '@icons/down-arrow.svg';
import LeftArrow from '@icons/left-arrow.svg';
import RightArrow from '@icons/right-arrow.svg';
import SpaceBar from '@icons/space-bar.svg';

import { ControlBlockWrapper, ControlList, ControlListIrem } from './styles';

function ControlBlock() {
  return (
    <ControlBlockWrapper>
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
    </ControlBlockWrapper>
  );
}

export default ControlBlock;
