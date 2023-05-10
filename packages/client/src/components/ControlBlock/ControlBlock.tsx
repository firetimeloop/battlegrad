import upArrow from '@icons/up-arrow.svg';
import spaceBar from '@icons/space-bar.svg';

import { ControlBlockWrapper, ControlList, ControlListItem } from './styles';

function ControlBlock() {
  return (
    <ControlBlockWrapper>
      <ControlList>
        <ControlListItem>
          <span>Движение вперед</span>
          <img alt="Стрелка вверх" src={upArrow} />
        </ControlListItem>
        <ControlListItem>
          <span>Движение назад</span>
          <img alt="Стрелка вниз" src={upArrow} className="down-arrow" />
        </ControlListItem>
        <ControlListItem>
          <span>Движение влево</span>
          <img alt="Стрелка влево" src={upArrow} className="left-arrow" />
        </ControlListItem>
        <ControlListItem>
          <span>Движение вправо</span>
          <img alt="Стрелка вправо" src={upArrow} className="right-arrow" />
        </ControlListItem>
        <ControlListItem>
          <span>Стрелять</span>
          <img alt="Пробел" src={spaceBar} />
        </ControlListItem>
      </ControlList>
    </ControlBlockWrapper>
  );
}

export default ControlBlock;
