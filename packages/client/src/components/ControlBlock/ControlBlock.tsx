import upArrow from '@icons/up-arrow.svg';
import downArrow from '@icons/down-arrow.svg';
import leftArrow from '@icons/left-arrow.svg';
import rightArrow from '@icons/right-arrow.svg';
import spaceBar from '@icons/space-bar.svg';

import { ControlBlockWrapper, ControlList, ControlListIrem } from './styles';

function ControlBlock() {
  return (
    <ControlBlockWrapper>
      <ControlList>
        <ControlListIrem>
          <span>Движение вперед</span>
          <img alt="Стрелка вверх" src={upArrow} />
        </ControlListIrem>
        <ControlListIrem>
          <span>Движение назад</span>
          <img alt="Стрелка вниз" src={downArrow} />
        </ControlListIrem>
        <ControlListIrem>
          <span>Движение влево</span>
          <img alt="Стрелка влево" src={leftArrow} />
        </ControlListIrem>
        <ControlListIrem>
          <span>Движение вправо</span>
          <img alt="Стрелка вправо" src={rightArrow} />
        </ControlListIrem>
        <ControlListIrem>
          <span>Стрелять</span>
          <img alt="Пробел" src={spaceBar} />
        </ControlListIrem>
      </ControlList>
    </ControlBlockWrapper>
  );
}

export default ControlBlock;
