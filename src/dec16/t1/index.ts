interface Spin {
    readonly type: "spin";
    readonly count: number;
}

interface Exchange {
    readonly type: "exchange";
    readonly posA: number;
    readonly posB: number;
}

interface Partner {
    readonly type: "partner";
    readonly nameA: string;
    readonly nameB: string;
}

type Dance = Spin | Exchange | Partner;

export function go(rawInput: string): string {
    const input = rawInput.split(",").map(r => mapCommandToDance(r));
    const dancers = [...Array(16).keys()].map(a => String.fromCharCode(97 + a)).join("");
    return input.reduce((a, b) => reduce(a, b), dancers);
}

function mapCommandToDance(cmd: string): Dance {
    const id = cmd.substring(0, 1);

    if (id === "s") {
        return {
            type: "spin",
            count: parseInt(cmd.substring(1))
        };
    }

    if (id === "x") {
        const split = cmd.substring(1).split("/");
        return {
            type: "exchange",
            posA: parseInt(split[0]),
            posB: parseInt(split[1])
        };
    }

    if (id === "p") {
        return {
            type: "partner",
            nameA: cmd.substring(1, 2),
            nameB: cmd.substring(3, 4)
        };
    }

    throw new Error("Unknown dance: + " + id);
}

function reduce(state: string, dance: Dance): string {
    switch (dance.type) {
        case "spin": {
            const ix = state.length - dance.count;
            const movers = state.substring(ix);
            return movers + state.substring(0, ix);
        }

        case "exchange": {
            const a = state[dance.posA];
            const b = state[dance.posB];

            return state.replace(a, "0").replace(b, a).replace("0", b);
        }

        case "partner": {
            return state.replace(dance.nameA, "0").replace(dance.nameB, dance.nameA).replace("0", dance.nameB);
        }
    }
}