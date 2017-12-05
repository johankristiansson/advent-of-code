export function go(rawInput: string): number {
    const input = rawInput.split("\n").map(r => parseInt(r));
    let instructions = input;
    let steps = 0;
    let index = 0;
    while(index < instructions.length) {
        const move = instructions[index];
        instructions[index] = move >= 3 ? move - 1 : move + 1;
        index += move;
        steps++;
    }
    return steps;
}