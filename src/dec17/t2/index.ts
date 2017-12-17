export function go(rawInput: string): number {
    const steps = parseInt(rawInput);
    let index = 0;
    let i = 0;
    let lastValueAtIndexOne = 0;

    while (i++ < 50000000) {
        index = (index + steps) % i + 1;
        if(index === 1){
            lastValueAtIndexOne = i;
        }
    }
    return lastValueAtIndexOne;
}