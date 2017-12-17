export function go(rawInput: string): number {
    const steps = parseInt(rawInput);
    let index = 0;
    let arr = [0];
    let i = 0;

    while (i++ < 2017) {
        index = (index + steps) % arr.length + 1;
        arr.splice(index, 0, i);
    }
    return arr[(index+1)%arr.length];
}