import type { PropsWithChildren } from 'react';
import { useTheme } from 'styled-components';

import { AvatarImg } from './styles';

type TAvatarProps = PropsWithChildren<{
  avatarUrl: string | null;
  size: number;
}>;

function Avatar({ avatarUrl, size }: TAvatarProps) {
  const theme = useTheme();
  const isAvatarAvailable = avatarUrl && avatarUrl?.length > 0;
  let defaultAvatarSrc = '';
  if (theme.name === 'darkTheme') {
    defaultAvatarSrc = '../../../public/tank-bg-light.png';
  } else {
    defaultAvatarSrc = '../../../public/tank-bg-dark.png';
  }
  const defaultAvatarForHighResolution =
    '/tank-bg-2048×2048.png';

  if (!isAvatarAvailable) {
    return (
      <picture>
        <source
          media="(min-width: 1920px)"
          srcSet={defaultAvatarForHighResolution}
        />
        <AvatarImg src={defaultAvatarSrc} alt="Аватар" size={size} />
      </picture>
    );
  }

  const avatarSrc = `https://ya-praktikum.tech/api/v2/resources${avatarUrl}`;

  return <AvatarImg src={avatarSrc} alt="Аватар" size={size} />;
}

export default Avatar;
