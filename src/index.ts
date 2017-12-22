import * as fs from "fs";
import * as path from "path";
import * as Dec1T1 from "./dec1/t1";
import * as Dec1T2 from "./dec1/t2";
import * as Dec2T1 from "./dec2/t1";
import * as Dec2T2 from "./dec2/t2";
import * as Dec3T1 from "./dec3/t1";
import * as Dec3T2 from "./dec3/t2";
import * as Dec4T1 from "./dec4/t1";
import * as Dec4T2 from "./dec4/t2";
import * as Dec5T1 from "./dec5/t1";
import * as Dec5T2 from "./dec5/t2";
import * as Dec6T1 from "./dec6/t1";
import * as Dec6T2 from "./dec6/t2";
import * as Dec7T1 from "./dec7/t1";
import * as Dec7T2 from "./dec7/t2";
import * as Dec8T1 from "./dec8/t1";
import * as Dec8T2 from "./dec8/t2";
import * as Dec9T1 from "./dec9/t1";
import * as Dec9T2 from "./dec9/t2";
import * as Dec10T1 from "./dec10/t1";
import * as Dec10T2 from "./dec10/t2";
import * as Dec11T1 from "./dec11/t1";
import * as Dec11T2 from "./dec11/t2";
import * as Dec12T1 from "./dec12/t1";
import * as Dec12T2 from "./dec12/t2";
import * as Dec13T1 from "./dec13/t1";
import * as Dec13T2 from "./dec13/t2";
import * as Dec14T1 from "./dec14/t1";
import * as Dec14T2 from "./dec14/t2";
import * as Dec15T1 from "./dec15/t1";
import * as Dec15T2 from "./dec15/t2";
import * as Dec16T1 from "./dec16/t1";
import * as Dec16T2 from "./dec16/t2";
import * as Dec17T1 from "./dec17/t1";
import * as Dec17T2 from "./dec17/t2";
import * as Dec18T1 from "./dec18/t1";

const calender: { [key: string]: (input: string) => any } = {
    "dec1-t1": (input: string) => Dec1T1.go(input),
    "dec1-t2": (input: string) => Dec1T2.go(input),
    "dec2-t1": (input: string) => Dec2T1.go(input),
    "dec2-t2": (input: string) => Dec2T2.go(input),
    "dec3-t1": (input: string) => Dec3T1.go(input),
    "dec3-t2": (input: string) => Dec3T2.go(input),
    "dec4-t1": (input: string) => Dec4T1.go(input),
    "dec4-t2": (input: string) => Dec4T2.go(input),
    "dec5-t1": (input: string) => Dec5T1.go(input),
    "dec5-t2": (input: string) => Dec5T2.go(input),
    "dec6-t1": (input: string) => Dec6T1.go(input),
    "dec6-t2": (input: string) => Dec6T2.go(input),
    "dec7-t1": (input: string) => Dec7T1.go(input),
    "dec7-t2": (input: string) => Dec7T2.go(input),
    "dec8-t1": (input: string) => Dec8T1.go(input),
    "dec8-t2": (input: string) => Dec8T2.go(input),
    "dec9-t1": (input: string) => Dec9T1.go(input),
    "dec9-t2": (input: string) => Dec9T2.go(input),
    "dec10-t1": (input: string) => Dec10T1.go(input),
    "dec10-t2": (input: string) => Dec10T2.go(input),
    "dec11-t1": (input: string) => Dec11T1.go(input),
    "dec11-t2": (input: string) => Dec11T2.go(input),
    "dec12-t1": (input: string) => Dec12T1.go(input),
    "dec12-t2": (input: string) => Dec12T2.go(input),
    "dec13-t1": (input: string) => Dec13T1.go(input),
    "dec13-t2": (input: string) => Dec13T2.go(input),
    "dec14-t1": (input: string) => Dec14T1.go(input),
    "dec14-t2": (input: string) => Dec14T2.go(input),
    "dec15-t1": (input: string) => Dec15T1.go(input),
    "dec15-t2": (input: string) => Dec15T2.go(input),
    "dec16-t1": (input: string) => Dec16T1.go(input),
    "dec16-t2": (input: string) => Dec16T2.go(input),
    "dec17-t1": (input: string) => Dec17T1.go(input),
    "dec17-t2": (input: string) => Dec17T2.go(input),
    "dec18-t1": (input: string) => Dec18T1.go(input),
};

go();

function go() {

    if (process.argv.length < 4) {
        console.log("Error - invalid arguments");
        return;
    }

    const task = process.argv[2];
    const inputArg = process.argv[3];

    const input = fs.existsSync(inputArg) ? fs.readFileSync(inputArg).toString() : inputArg;
    calculate(task, input);
}

function calculate(task: string, input: string) {
    const result = calender[task](input);
    console.log(result);
}

