import styled from 'styled-components';

export const AvatarContainer = styled.div`
  display: flex;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
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

export const AvatarSaveButton = styled.button`
  padding: 0;
`;
