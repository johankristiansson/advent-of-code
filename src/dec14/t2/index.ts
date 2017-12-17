export function go(rawInput: string): number {
    const input = [...Array(128).keys()].map(r => (rawInput + "-" + r).split("").map(rr => rr.charCodeAt(0)).concat([17, 31, 73, 47, 23]));
    const rows = input.map(r => hash(calculateList([...Array(256).keys()], r)));
    return countGroups(rows);
}

function calculateList([...list]: Array<number>, input: Array<number>): Array<number> {
    let skip = 0;
    let index = 0;
    let inputPointer = 0;
    let rounds = 0;

    while (rounds++ < 64) {
        while (inputPointer < input.length) {
            const length = input[inputPointer++];
            list = list.map((l, ix) => (index + length < list.length ? ix >= index && ix < index + length : ix >= index || ix < (index + length) % list.length) ? list[(index + length - 1 - ix + index) % list.length] : l);
            index = (index + length + skip++) % list.length;
        }
        inputPointer = 0;
    }
    return list;
}

function hash(list: Array<number>): Array<number> {
    const pad = "00000000";
    const chunks = list.map((l, ix) => ix % 16 === 0 ? list.slice(ix, ix + 16) : undefined)!.filter(l => l);
    return chunks.map(c => c!.reduce((a, b) => a ^ b, 0)).reduce((a, b) => {
        const bin = b.toString(2);
        return a + pad.substring(0, pad.length - bin.length) + bin;
    }, "").split("").map(b => parseInt(b));
}

function countGroups([...rows]: Array<Array<number>>, id = 2): number {

    const sy = rows.findIndex(r => !!r.find(rr => rr === 1));
    if (!~sy) {
        return id - 2;
    }
    const sx = rows[sy].findIndex(r => r === 1);

    const queue = [{ x: sx, y: sy }];
    while (queue.length > 0) {
        const pos = queue.shift()!;
        rows[pos.y][pos.x] = id;

        {
            const y = rows[pos.y + 1];
            if (y !== undefined) {
                const x = y[pos.x];
                if(x === 1 && !queue.find(q => q.x === pos.x && q.y === pos.y + 1)){
                    queue.push({x: pos.x, y: pos.y + 1})
                }
            }
        }

        {
            const y = rows[pos.y - 1];
            if (y !== undefined) {
                const x = y[pos.x];
                if(x === 1 && !queue.find(q => q.x === pos.x && q.y === pos.y - 1)){
                    queue.push({x: pos.x, y: pos.y - 1})
                }
            }
        }

        {
            const y = rows[pos.y];
            const x = y[pos.x+1];
            if(x !== undefined){
                if(x === 1 && !queue.find(q => q.x === pos.x+1 && q.y === pos.y)){
                    queue.push({x: pos.x+1, y: pos.y})
                }
            }
        }
        {
            const y = rows[pos.y];
            const x = y[pos.x-1];
            if(x !== undefined){
                if(x === 1 && !queue.find(q => q.x === pos.x-1 && q.y === pos.y)){
                    queue.push({x: pos.x-1, y: pos.y})
                }
            }
        }
    }

    return countGroups(rows, id + 1);
}
