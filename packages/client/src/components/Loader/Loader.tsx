import React from 'react';
import { Spinner } from './styles';
import { MiniLoaderProps } from '../../interface';

function Loader({ color, size }: MiniLoaderProps) {
  return (
    <Spinner color={color} size={size}>
      <div />
    </Spinner>
  );
}

export default Loader;
