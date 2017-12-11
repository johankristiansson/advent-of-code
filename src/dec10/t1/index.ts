export function go(rawInput: string): number {
    const input = rawInput.split(",").map(r => parseInt(r));
    const list = calculateList([...Array(256).keys()], input);
    return list[0] * list[1];
}

function calculateList([...list]: Array<number>, input: Array<number>): Array<number>{
    let skip = 0;
    let index = 0;
    let inputPointer = 0;

    while(inputPointer < input.length){
        const length = input[inputPointer++];
        list = list.map((l, ix) => (index + length < list.length ? ix >= index && ix < index + length : ix >= index || ix < (index + length) % list.length) ? list[(index+length-1-ix+index)%list.length] : l);
        index = (index + length + skip++) % list.length;
    }
    return list;
}