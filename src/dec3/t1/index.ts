export function go(rawInput: string){
    const input = parseInt(rawInput);
    const layer = Math.ceil((Math.sqrt(input) + 1) / 2);
    return layer + Math.abs((input - getMaxValueOfLayer(layer - 1) - 1) % getLength(layer) - (layer - 2)) - 1 || 0;
}

function getMaxValueOfLayer(layer: number): number {
    return Math.pow(layer * 2 - 1, 2);
}

function getLength(layer: number): number {
    return (layer - 1) * 2;
}
