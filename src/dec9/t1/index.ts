export function go(rawInput: string): number {
    let ix = 0;
    let sum = 0;
    let deepth = 0;
    let isGarbage = false;
    while(ix < rawInput.length) {
        let char = rawInput.charAt(ix);
        if(char === "!") {
            ix++;
        }
        else if(char === "{" && !isGarbage){
            sum += ++deepth;
        }
        else if (char === "}" && !isGarbage){
            deepth--;
        }
        else if(char === "<"){
            isGarbage = true;
        }
        else if(char === ">"){
            isGarbage = false;
        }
        ix++;
    }
    return sum;
}