interface Node {
    readonly id: string;
    readonly weight: number;
    readonly children: Array<string>;
}

export function go(rawInput: string): number {

    const input = rawInput.split("\n").map(i => {
        const split = i.split("->");
        const children = split[1] ? split[1].split(",").map(s => s.trim()) : [];
        const split2 = split[0].split(" ");
        const id = split2[0];
        const weight = parseInt(split2[1].substring(1, split2[1].indexOf(")")));
        return {
            id: id,
            weight: weight,
            children: children,
        };
    });
    const root = walkDownTree(input.find(i => i.children.length == 0)!, input);
    const errorNode = findWrongNode(root, input);
    const layerOne = root.children.map(c => {
        const node = input.find(i => i.id === c)!;
        return {
            node: node,
            weight: sumSub(node, input)
        };
    });
    const correct = layerOne.find(l => layerOne.filter(ll => ll.weight).length > 1)!;
    const offset = layerOne.find(l => l.weight !== correct.weight)!.weight - correct.weight;
    return errorNode.weight + offset;
}

function findWrongNode(node: Node, allNodes: Array<Node>): Node {
    const children = node.children.map(n => allNodes.find(nn => nn.id === n)!);
    const faultyChild = children.find(c => children.filter(cc => cc.weight === c.weight).length === 1);
    return faultyChild !== undefined ? findWrongNode(faultyChild, allNodes) : node;
}

function walkDownTree(node: Node, allNodes: Array<Node>): Node {
    const parent = allNodes.find(n => n.children.find(nn => nn === node.id) !== undefined);
    return parent !== undefined ? walkDownTree(parent, allNodes) : node;
}

function sumSub(node: Node, allNodes: Array<Node>): number {
    return node.weight + node.children.reduce((a, b) => {
        const child = allNodes.find(n => n.id === b)!;
        return a + sumSub(child, allNodes)
    }, 0);
}