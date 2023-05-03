import { LEVEL_OBJECT } from '../components/Game/utils/consts';

const {
  EMPTY: EMP,
  WALL: WAL,
  LEFT_WALL: LWA,
  RIGHT_WALL: RWA,
  TOP_WALL: TWA,
  BOTTOM_WALL: BWA,
  TOP_METAL_WALL: TMW,
  STANDARD: STA,
} = LEVEL_OBJECT;

export const LEVELS: number[][][] = [
  [
    [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    [EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP],
    [EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP],
    [EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP],
    [EMP, WAL, EMP, WAL, EMP, TWA, EMP, TWA, EMP, WAL, EMP, WAL, EMP],
    [EMP, TWA, EMP, TWA, EMP, BWA, EMP, BWA, EMP, TWA, EMP, TWA, EMP],
    [BWA, EMP, BWA, BWA, EMP, TWA, EMP, TWA, EMP, BWA, BWA, EMP, BWA],
    [TMW, EMP, TWA, TWA, EMP, BWA, EMP, BWA, EMP, TWA, TWA, EMP, TMW],
    [EMP, BWA, EMP, BWA, EMP, WAL, WAL, WAL, EMP, BWA, EMP, BWA, EMP],
    [EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP, WAL, EMP],
    [EMP, WAL, EMP, WAL, EMP, TWA, EMP, TWA, EMP, WAL, EMP, WAL, EMP],
    [EMP, WAL, EMP, WAL, EMP, EMP, BWA, EMP, EMP, WAL, EMP, WAL, EMP],
    [EMP, EMP, EMP, EMP, EMP, RWA, STA, LWA, EMP, EMP, EMP, EMP, EMP],
  ],
];