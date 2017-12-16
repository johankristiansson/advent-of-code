export function go(rawInput: string): number {
    let input = rawInput.split("\n").map(r => {
        const split = r.split("<->");
        return { id: parseInt(split[0]), connectionIds: split[1].split(", ").map(rr => parseInt(rr)) };
    });
    let groups = 0;
    while (input.length > 0) {
        let stack = [input[0].id];
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
        input = input.filter(i => visited.find(v => v === i.id) === undefined);
        groups++;
    }
    return groups;
}