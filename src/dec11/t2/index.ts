interface Coord {
    readonly x: number;
    readonly y: number;
}

export function go(rawInput: string): number {

    const input = rawInput.split(",");
    const start = {
        coord: {
            x: 0, y: 0
        },
        max: 0
    };
    const finish = input.reduce((a, b) => {
        const coord = next(a.coord, b);
        return {
            ...a,
            coord: coord,
            max: Math.max(a.max, getDistance(coord))
        }
    }, start);

    return finish.max;
}

function getDistance(coord: Coord): number {
    return Math.ceil(Math.abs(coord.x) / 2) + Math.floor(Math.abs(coord.y));
}


const registryOddX: { [k: string]: Coord } = {
    "n": { x: 0, y: -1 },
    "s": { x: 0, y: 1 },
    "nw": { x: -1, y: 0 },
    "ne": { x: 1, y: 0 },
    "sw": { x: -1, y: 1 },
    "se": { x: 1, y: 1 }
}

const registryEvenX: { [k: string]: Coord } = {
    "n": { x: 0, y: -1 },
    "s": { x: 0, y: 1 },
    "nw": { x: -1, y: -1 },
    "ne": { x: 1, y: -1 },
    "sw": { x: -1, y: 0 },
    "se": { x: 1, y: 0 }
}

function next(coord: Coord, direction: string): Coord {
    const delta = coord.x % 2 === 0 ? registryEvenX[direction] : registryOddX[direction];
    return {
        x: coord.x + delta.x,
        y: coord.y + delta.y,
    };
}