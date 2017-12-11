interface Node {
    readonly id: string;
    readonly weight: number;
    readonly children: Array<Node>;
}

interface Input {
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

    const rootInput = walkDownTree(input.find(i => i.children.length == 0)!, input);
    const root = buildRootNode(rootInput, input);
    const errorNode = findWrongNode(root);
    const firstLayer = root.children.map(c => ({
        node: c,
        load: sumSub(c),
    }));
    const randomOkNodeAtFirstLayer = firstLayer.find(f => firstLayer.filter(ff => ff.load === f.load).length > 1)!;
    return errorNode.weight + (randomOkNodeAtFirstLayer.load - firstLayer.find(f => f.load !== randomOkNodeAtFirstLayer.load)!.load);
}

function buildRootNode(rootInput: Input, allInputs: Array<Input>): Node {
    return {
        id: rootInput.id,
        weight: rootInput.weight,
        children: rootInput.children.map(c => buildRootNode(allInputs.find(i => i.id === c)!, allInputs))
    };
}

function findWrongNode(node: Node): Node {
    const faultyChild = node.children.find(c => node.children.filter(cc => cc.weight === c.weight).length === 1);
    return faultyChild ? findWrongNode(faultyChild) : node;
}

function walkDownTree(node: Input, allNodes: Array<Input>): Input {
    const parent = allNodes.find(n => !!n.children.find(nn => nn === node.id));
    return parent ? walkDownTree(parent, allNodes) : node;
}

function sumSub(node: Node): number {
    return node.weight + node.children.reduce((a, b) => a + sumSub(b), 0);
}