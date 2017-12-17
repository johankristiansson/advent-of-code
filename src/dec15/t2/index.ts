const aFactor = 16807;
const bFactor = 48271;
const product = 2147483647;
const judgeCapacity = 5000000;

export function go(rawInput: string): number {
    const input = rawInput.split("\n").map(r => parseInt(r.split(" ")[4]));
    let a = input[0];
    let b = input[1];
    const judgeQueueA: Array<number> = [];
    const judgeQueueB: Array<number> = [];

    while (judgeQueueA.length < judgeCapacity || judgeQueueB.length < judgeCapacity) {
        a = next(a, aFactor);
        b = next(b, bFactor);

        if (judgeQueueA.length < judgeCapacity && a % 4 === 0) {
            judgeQueueA.push(a);
        }
        if (judgeQueueB.length < judgeCapacity && b % 8 === 0) {
            judgeQueueB.push(b);
        }
    }

    const mask = Math.pow(2, 16) - 1;
    let count = 0;
    let index = 0;
    while (index < judgeQueueA.length) {
        const ja = judgeQueueA[index];
        const jb = judgeQueueB[index];

        if ((ja & mask) === (jb & mask)) {
            count++;
        }

        index++;
    }
    return count;
}

function next(curr: number, factor: number): number {
    return (curr * factor) % product;
}