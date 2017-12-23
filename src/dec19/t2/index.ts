interface Coord {
  readonly x: number;
  readonly y: number;
}

type Direction = "up" | "right" | "down" | "left";

export function go(rawInput: string): number {
  const map = rawInput.split("\r\n").map(r => r.split(""));

  let pos = {
    x: map[0].indexOf("|"),
    y: 0
  };

  let direction: Direction = "down";

  let i = 0;
  while (true) {
    i++;
    pos = next(pos, direction);
    const symbol = map[pos.y][pos.x];
    if (symbol === " ") {
      break;
    } else if (symbol === "|" || symbol === "-") {
      continue;
    } else if (symbol === "+") {
      direction = getNewDirection(map, pos, direction);
    }
  }

  return i;
}

function getNewDirection(
  map: Array<Array<string>>,
  pos: Coord,
  direction: Direction
): Direction {
  const ways = turns[direction].find(t => {
    const nextPos = next(pos, t);
    const symbol = map[nextPos.y][nextPos.x];

    return (
      ((t === "left" || t === "right") && symbol !== "|" && symbol !== " ") ||
      ((t === "up" || t === "down") && symbol !== "-" && symbol !== " ")
    );
  });

  return ways!;
}

function next(pos: Coord, direction: Direction): Coord {
  const d = delta[direction];
  return {
    x: pos.x + d.x,
    y: pos.y + d.y
  };
}

const delta: { [k: string]: Coord } = {
  ["up"]: { x: 0, y: -1 },
  ["right"]: { x: 1, y: 0 },
  ["down"]: { x: 0, y: 1 },
  ["left"]: { x: -1, y: 0 }
};

const turns: { [k: string]: Array<Direction> } = {
  ["up"]: ["left", "right"],
  ["right"]: ["up", "down"],
  ["down"]: ["left", "right"],
  ["left"]: ["up", "down"]
};
