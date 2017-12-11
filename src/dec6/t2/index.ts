interface Bank {
    readonly load: Array<number>;
    readonly cycle: number,
}

export function go(rawInput: string): number {
    
        const input = rawInput.split(",").map(r => parseInt(r));
        let banks = input;
        const bankHistory: Array<Array<number>> = [banks]; 
    
        while(true) {
            
            banks = banks.concat([]);
            let ix = banks.reduce((a, b, ix) => b > banks[a] ? ix : a, 0);
            const load = banks[ix];
            banks[ix] = 0;
            let count = 0;
            while(count++ < load){
                ix = (ix + 1) % banks.length;
                banks[ix]++;
            }
    
            const q = bankHistory.reduce((a: number | undefined, b, i) => a === undefined ? (b.reduce((a2, b2, i2) => a2 + (b2 === banks[i2] ? 0 : 1), 0) === 0 ? i : undefined) : a, undefined)
            if(q !== undefined) {
                return bankHistory.length - q;
            }
            bankHistory.push(banks);
        }
    }