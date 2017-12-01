export function go(rawInput: string): number {
    
    const input = rawInput.split('').map(i => parseInt(i));
    let sum = 0;
    let ix = 0;
    while(ix < input.length){
        const a = input[ix];
        const b = input[++ix%input.length];
        if(a === b) {
            sum += a;
        }
    }
    return sum;
}