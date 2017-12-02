export function go(rawInput: string) {
    const input = rawInput.split("\n").map(r => r.split("\t").map(r => parseInt(r)));

    return input.reduce((a, b) => {
        const sb = b.concat([]).sort((q, w) => q - w);
        return a + (sb[sb.length-1] - sb[0]);
    }, 0);
}