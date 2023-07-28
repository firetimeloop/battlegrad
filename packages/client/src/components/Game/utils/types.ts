export type Position = {
    x: number;
    y: number;
}

export type PartialPosition = Partial<Position>;

export type Sprite = [number, number, number, number];

// Числа имеют другую смысловую нагрузку, поэтому не использую Sprite
export type Collider = [number, number, number, number];
