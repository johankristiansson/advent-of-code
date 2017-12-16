export function go(rawInput: string): number {

    const input = rawInput.split("\n").map(r => {
        const split = r.split("<->");
        return { id: parseInt(split[0]), connectionIds: split[1].split(", ").map(rr => parseInt(rr)) };
    });

    let stack = [0];
    const visited: Array<number> = [];
    while (stack.length > 0) {
        const nextId = stack.pop()!;
        const next = input.find(i => i.id === nextId)!;
        if (~visited.indexOf(next.id)) {
            continue;
        }
        visited.push(next.id);
        stack = stack.concat(next.connectionIds.filter(c => !~stack.indexOf(c)));
    }
    return visited.length;
}