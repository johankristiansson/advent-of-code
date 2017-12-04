export function go(rawInput: string): number {
    const input = rawInput.split("\n").map(r => r.trim().split(" ").map(r2 => r2.split("").concat([]).sort().join("")));
    return input.reduce((a, b) => a + (!b.reduce((a2, b2) => a2 + (b.filter(b3 => b3 === b2).length > 1 ? 1 : 0), 0) ? 1 : 0), 0);
}