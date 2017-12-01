import * as DecT1 from "./dec1/t1";
import * as DecT2 from "./dec1/t2";

const calender: {[key: string]: (input: string) => any} = {
    "dec-t1": (input: string) => DecT1.go(input),
    "dec-t2": (input: string) => DecT2.go(input),
};

if(process.argv.length < 4){
    console.log("error");
}

const task = process.argv[2];
const input = process.argv[3];

const result = calender[task](input);
console.log(result);