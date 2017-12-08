interface Instruction {
    readonly registry: string;
    readonly inc: boolean;
    readonly value: number;
    readonly condition: Condition;
}

interface Condition {
    readonly left: string;
    readonly right: number;
    readonly comparer: Comparer;
}

enum Comparer {
    LessThan,
    LessThanOrEqual,
    GreaterThan,
    GreaterThanOrEqual,
    Equal,
    NotEqual
}

const mapCompare: {[k: string]: Comparer} = {
    ["<"]: Comparer.LessThan,
    ["<="]: Comparer.LessThanOrEqual,
    [">"]: Comparer.GreaterThan,
    [">="]: Comparer.GreaterThanOrEqual,
    ["=="]: Comparer.Equal,
    ["!="]: Comparer.NotEqual
};

export function go(rawInput: string): number {
    const instructions = rawInput.split("\n").map(r => {
        const split = r.split(" ");
        return {
            registry: split[0],
            inc: split[1] === "inc",
            value: parseInt(split[2]),
            condition: {
                left: split[4],
                right: parseInt(split[6]),
                comparer: mapCompare[split[5]],
            }
        }
    });

    const registry: {[k: string]: number} = {};

    const finilizedRegistry = instructions.reduce((a, b) => {
        const reg = a[b.registry];
        const addition = testCondition(b.condition, a) ? (b.value * (b.inc ? 1 : -1)): 0;
        return {...a,
            [b.registry]: reg !== undefined ? reg + addition: addition
        };
    }, registry);

    return Math.max(...Object.keys(finilizedRegistry).map(i => finilizedRegistry[i]));
}

function testCondition(condition: Condition, registry: {[k: string]: number}): boolean {
    const left = registry[condition.left] || 0;
    
    if(condition.comparer === Comparer.Equal) {
        return left === condition.right;
    }

    if(condition.comparer === Comparer.NotEqual) {
        return left !== condition.right;
    }

    if(condition.comparer === Comparer.LessThan) {
        return left < condition.right;
    }

    if(condition.comparer === Comparer.LessThanOrEqual) {
        return left <= condition.right;
    }

    if(condition.comparer === Comparer.GreaterThan) {
        return left > condition.right;
    }

    if(condition.comparer === Comparer.GreaterThanOrEqual) {
        return left >= condition.right;
    }

    throw new Error("Unknown comparer " + condition.comparer);
}