export function go(rawInput: string): number{
    const input = rawInput.split("\n").map(r => {
        const split = r.split(": ");
        return{
            deepth: parseInt(split[0], 10),
            range: parseInt(split[1], 10)
        };
    });
    
    const punishment = input.reduce((a, b) => isHit(b.deepth, b.range) ? a += b.deepth * b.range : a, 0);
    return punishment;
}

function isHit(time: number, range: number): boolean{
    return time % (range * 2 - 2) === 0;
}