import type { PropsWithChildren } from 'react';

import { AvatarImg } from './styles';

type TAvatarProps = PropsWithChildren<{
  avatarUrl: string | null;
  size: number;
}>;

function Avatar({ avatarUrl, size }: TAvatarProps) {
  const isAvatarAvailable = avatarUrl && avatarUrl?.length > 0;
  const defaultAvatarSrc = '/tank-bg.png';
  const defaultAvatarForHighResolution =
    '/tank-bg-2048×2048.png';

  if (!isAvatarAvailable) {
    return (
      <picture>
        <source
          media="(min-width: 1920px)"
          srcSet={defaultAvatarForHighResolution}
        />
        <AvatarImg
          src={defaultAvatarSrc}
          alt="Аватар"
          size={size}
        />
      </picture>
    );
  }

  const avatarSrc = `https://ya-praktikum.tech/api/v2/resources${avatarUrl}`;

  return <AvatarImg src={avatarSrc} alt="Аватар" size={size} />;
}

export default Avatar;
