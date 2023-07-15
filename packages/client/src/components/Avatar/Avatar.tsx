import type { PropsWithChildren } from 'react';
import { useTheme } from 'styled-components';

import { AvatarImg } from './styles';

import { proxyYandexBaseUrl } from '../../app/api';

type TAvatarProps = PropsWithChildren<{
  avatarUrl: string | null;
  size: number;
}>;

function Avatar({ avatarUrl, size }: TAvatarProps) {
  const theme = useTheme();
  const isAvatarAvailable = avatarUrl && avatarUrl?.length > 0;
  let defaultAvatarSrc = '/tank-bg-light.png';
  if (theme!.name === 'darkTheme') {
    defaultAvatarSrc = '/tank-bg-light.png';
  } else {
    defaultAvatarSrc = '/tank-bg-dark.png';
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

  const avatarSrc = `${proxyYandexBaseUrl}/resources${avatarUrl}`;

  return <AvatarImg src={avatarSrc} alt="Аватар" size={size} />;
}

export default Avatar;
