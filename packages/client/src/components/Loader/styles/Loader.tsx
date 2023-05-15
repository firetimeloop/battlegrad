import styled from 'styled-components';
import { MiniLoaderProps } from '../../../interface';

export const Spinner = styled.div<MiniLoaderProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  display: block;
  position: relative;

  ::after {
    position: absolute;
    left: 0;
    top: 0;
    clip: rect(0, ${(props) => props.size}px, 
    ${(props) => props.size}px, ${(props) => +props.size / 2}px);
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    content: '';
    animation: spinner-circle 0.8s ease-in-out infinite;
    border-radius: 50%;
    box-shadow: inset 0 0 0 ${(props) => +props.size / 13}px ${(props) => props.color};
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
