export function go(rawInput: string): number {
    const input = rawInput.split("\n").map(r => {
        const split = r.split(": ");
        return {
            deepth: parseInt(split[0], 10),
            range: parseInt(split[1], 10)
        };
    });

    let delay = 0;
    while (true) {
        if (!input.reduce((a, b) => a || isHit(b.deepth + delay, b.range) ? true : a, false)) {
            break;
        }
        delay++;
    }
    return delay;
}

function isHit(time: number, range: number): boolean {
    return time % (range * 2 - 2) === 0;
}