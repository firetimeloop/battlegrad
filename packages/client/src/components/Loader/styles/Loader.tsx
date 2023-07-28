import styled from 'styled-components';
import { MiniLoaderProps } from '../../../interface';

export const Spinner = styled.div<MiniLoaderProps>`
  width: ${({ size }) => size ?? '20'}px;
  height: ${({ size }) => size ?? '20'}px;
  border-radius: 50%;
  display: block;
  position: relative;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    clip: rect(0, ${({ size }) => size ?? '20'}px, ${
  ({ size }) => size ?? '20'}px, ${({ size }) => +(size ?? '20') / 2}px);
    width: ${({ size }) => size ?? '20'}px;
    height: ${({ size }) => size ?? '20'}px;
    content: '';
    animation: spinner-circle 0.8s ease-in-out infinite;
    border-radius: 50%;
    box-shadow: inset 0 0 0 ${({ size }) => +(size ?? '20') / 13}px ${
  ({ color, theme }) => color ?? theme.colors.onBackground};
  }

  @keyframes spinner-circle {
    0% {
      transform: rotate(-180deg);
    }
      
    100% {
      transform: rotate(180deg);
    }
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
