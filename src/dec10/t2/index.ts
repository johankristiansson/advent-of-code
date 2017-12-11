export function go(rawInput: string): string {
    const input = rawInput.split("").map(r => r.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
    const list = calculateList([...Array(256).keys()], input);
    const chunks = list.map((l, ix) => ix%16 === 0 ? list.slice(ix, ix+16) : undefined)!.filter(l => l);
    return chunks.map(c => c!.reduce((a, b) => a ^ b, 0)).reduce((a, b) => a + (b < 16 ? "0" : "") + b.toString(16), "");
}

function calculateList([...list]: Array<number>, input: Array<number>): Array<number> {
    let skip = 0;
    let index = 0;
    let inputPointer = 0;
    let rounds = 0;

    while (rounds++ < 64) {
        while (inputPointer < input.length) {
            const length = input[inputPointer++];
            list = list.map((l, ix) => (index + length < list.length ? ix >= index && ix < index + length : ix >= index || ix < (index + length) % list.length) ? list[(index + length - 1 - ix + index) % list.length] : l);
            index = (index + length + skip++) % list.length;
        }
        inputPointer = 0;
    }
    return list;
}