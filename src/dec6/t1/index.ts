
export function go(rawInput: string): number {

    const input = rawInput.split("\t").map(r => parseInt(r));
    let banks = input;
    const bankHistory: Array<Array<number>> = [banks]; 

    while(true) {
        
        banks = banks.concat([]);
        let ix = banks.reduce((a, b, ix) => b > banks[a] ? ix : a, 0);
        const load = banks[ix];
        banks[ix] = 0;
        let count = 0;
        while(count++ < load){
            ix = (ix + 1)%banks.length;
            banks[ix]++;
        }

        if(bankHistory.filter(bh => bh.reduce((a, b, i) => a + (b === banks[i] ? 0 : 1), 0) === 0).length > 0) {
            break;
        }
        bankHistory.push(banks);
    }
    return bankHistory.length;
}