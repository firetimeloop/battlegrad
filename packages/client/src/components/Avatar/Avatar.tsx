import { PropsWithChildren } from 'react';

import { AvatarImg } from './styles';

type TAvatarProps = PropsWithChildren<{
  avatarUrl: string | null;
  size: number;
}>;

function Avatar({ avatarUrl, size }: TAvatarProps) {
  let avatarSrc = '../../../public/tank-bg.png';

  if (avatarUrl && avatarUrl?.length > 0) {
    avatarSrc = `https://ya-praktikum.tech/api/v2/resources${avatarUrl}`;
  }

  return <AvatarImg src={avatarSrc} alt="Аватар" size={size} />;
}

export default Avatar;
