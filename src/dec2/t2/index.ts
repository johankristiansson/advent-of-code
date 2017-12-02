export function go(rawInput: string) {
    const input = rawInput.split("\n").map(r => r.split("\t").map(r => parseInt(r)));

    return input.reduce((a1, b1) => a1 + b1.reduce((a2, b2) => {
            const a = b1.map(b => ({div: b/b2, rest: b%b2})).find(b => b.div !== 1 && b.rest === 0);
            return a !== undefined ? a.div : a2;
    }, 0), 0);
}