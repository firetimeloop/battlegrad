import React from 'react';
import { Spinner } from './styles';
import { MiniLoaderProps } from '../../interface';

function MiniLoader({ color, size }: MiniLoaderProps) {
  return <Spinner color={color} size={size} />;
}
export default MiniLoader;
