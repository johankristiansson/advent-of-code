export function go(rawInput: string): number {
    let ix = 0;
    let sum = 0;
    let isGarbage = false;
    while(ix < rawInput.length) {
        let char = rawInput.charAt(ix);
        if(char === "!") {
            ix++;
        }
        else if(char === "<" && !isGarbage){
            isGarbage = true;
        }
        else if(char === ">"){
            isGarbage = false;
        }
        else if(isGarbage){
            sum++;
        }
        ix++;
    }
    return sum;
}