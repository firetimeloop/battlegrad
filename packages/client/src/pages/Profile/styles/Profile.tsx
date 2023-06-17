import styled from 'styled-components';
import { BorderedFormBlock, RowGap10 } from '../../../styles';

export const AvatarContainer = styled.div`
  display: flex;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin-top: 15px;
`;
export const Avatar = styled.img`
  width: 130px;
  height: 130px;
  object-fit: scale-down;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const EmptyAvatar = styled.img`
  display: flex;
  width: 130px;
  height: 130px;
  background: #efefef center no-repeat url("emptyAvatar.svg");
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const AvatarInput = styled.input`
  padding: 0;
`;

export const ProfileBlock = styled(BorderedFormBlock)`
  gap: 0;

  input {
    height: 30px;
  }

  form {
    margin-top: 15px;
    gap: 10px;

    input {
      padding: 15px;
    }
  }

  button {
    margin: 15px 0 10px;
    height: 30px;
    padding: 5px 10px;
    border-radius: 8px;
  }
  ${RowGap10} {
    margin-top: 15px;
  }
`;
