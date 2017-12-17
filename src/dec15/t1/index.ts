const aFactor = 16807;
const bFactor = 48271;
const product = 2147483647;

export function go(rawInput: string): number {
    const input = rawInput.split("\n").map(r => parseInt(r.split(" ")[4]));
    let a = input[0];
    let b = input[1];

    const mask = Math.pow(2, 16) - 1;
    let count = 0;
    let index = 0;
    while (index < 40000000) {
        a = next(a, aFactor);
        b = next(b, bFactor);
        if ((a & mask) === (b & mask)) {
            count++;
        }
        index++;
    }
    return count;
}

function next(curr: number, factor: number): number {
    return (curr * factor) % product;
}