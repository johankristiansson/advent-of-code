interface Node {
    readonly id: string;
    readonly children: Array<string>;
}

export function go(rawInput: string): string {

    const input = rawInput.split("\n").map(i => {
        const split = i.split("->");
        const children = split[1] ? split[1].split(",").map(s => s.trim()) : [];
        const id = split[0].substring(0, split[0].indexOf(" "));
        return {
            id: id,
            children: children,
        };
    });
    return walkDownTree(input.find(i => i.children.length == 0)!, input).id;
}

function walkDownTree(node: Node, allNodes: Array<Node>): Node {
    const parent = allNodes.find(n => n.children.find(nn => nn === node.id) !== undefined);
    return parent !== undefined ? walkDownTree(parent, allNodes): node;
}