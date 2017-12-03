interface Coord {
    readonly x: number;
    readonly y: number;
    readonly value: number;
}

enum Direction {
    Up,
    Right,
    Down,
    Left
}

export function go(rawInput: string): number {
    const input = parseInt(rawInput);

    const map: Coord[] = [];
    let turns = 0;
    let stepsBeforeTurn = 1;
    let steps = 0;
    let direction = Direction.Right;
    let position = {
        x: 0,
        y: 0,
        value: 1,
    };
    map.push(position);

    while(true) {
        const x = direction === Direction.Up || direction === Direction.Down ? position.x : direction === Direction.Left ? position.x - 1 : position.x + 1;
        const y = direction === Direction.Left || direction === Direction.Right ? position.y : direction === Direction.Down ? position.y - 1 : position.y + 1;
        
        position = {
            x: x,
            y: y,
            value: getValue(map, x, y),
        };
        map.push(position);

        if(position.value >= input){
            break;
        }

        if(++steps >= stepsBeforeTurn){
            turns++;
            direction = nextDir(direction);
            steps = 0;
        }
        if(turns > 1){
            turns = 0;
            stepsBeforeTurn++;
        }
    }
    return position.value;
}

function getValue(map: Coord[], x: number, y: number): number {
    const adjecent: (Coord|undefined)[] = [];
    adjecent.push(map.find(m => m.x === x && m.y === y+1));
    adjecent.push(map.find(m => m.x === x+1 && m.y === y+1));
    adjecent.push(map.find(m => m.x === x+1 && m.y === y));
    adjecent.push(map.find(m => m.x === x+1 && m.y === y-1));
    adjecent.push(map.find(m => m.x === x && m.y === y-1));
    adjecent.push(map.find(m => m.x === x-1 && m.y === y-1));
    adjecent.push(map.find(m => m.x === x-1 && m.y === y));
    adjecent.push(map.find(m => m.x === x-1 && m.y === y+1));
    return adjecent.filter(a => a !== undefined).reduce((a, b) => a + b!.value, 0);
}

function nextDir(dir: Direction): Direction {
    if(dir === Direction.Up) {
        return Direction.Left;
    }
    if(dir === Direction.Left) {
        return Direction.Down;
    }
    if(dir === Direction.Down) {
        return Direction.Right;
    }
    if(dir === Direction.Right) {
        return Direction.Up;
    }
    throw new Error("Unknown direction");
}
