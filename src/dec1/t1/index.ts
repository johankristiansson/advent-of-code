export function go(rawInput: string): number {
    const input = rawInput.split('').map(i => parseInt(i));
    return input.reduce((a, b, ix: number) => b === input[(ix+1)%input.length] ? a + b : a, 0);
}