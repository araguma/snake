export interface Entity {
    update: () => void;
    render: () => void;
}

export type Coordinate = {
    x: number,
    y: number,
}

export const Direction: Record<'Up' | 'Down' | 'Left' | 'Right', Coordinate> = {
    Up: { x: 0, y: -1 },
    Down: { x: 0, y: 1 },
    Left: { x: -1, y: 0 },
    Right: { x: 1, y: 0 },
}