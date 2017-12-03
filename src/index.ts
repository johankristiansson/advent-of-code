import * as Dec1T1 from "./dec1/t1";
import * as Dec1T2 from "./dec1/t2";
import * as Dec2T1 from "./dec2/t1";
import * as Dec2T2 from "./dec2/t2";
import * as Dec3T1 from "./dec3/t1";
import * as Dec3T2 from "./dec3/t2";

const calender: {[key: string]: (input: string) => any} = {
    "dec1-t1": (input: string) => Dec1T1.go(input),
    "dec1-t2": (input: string) => Dec1T2.go(input),
    "dec2-t1": (input: string) => Dec2T1.go(input),
    "dec2-t2": (input: string) => Dec2T2.go(input),
    "dec3-t1": (input: string) => Dec3T1.go(input),
    "dec3-t2": (input: string) => Dec3T2.go(input),
};

if(process.argv.length < 4){
    console.log("error");
}

const task = process.argv[2];
const input = process.argv[3];

const result = calender[task](input);
console.log(result);