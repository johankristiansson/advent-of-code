export function go(rawInput: string): number {
    const filteredIgnored = rawInput.split("!!").join("").split("!").map((r, ix) => ix === 0 ? r : r.substring(1)).join("");
    const clean = filteredIgnored.split(">").map((f, ix)=> ~f.indexOf("<") ? f.substring(0, f.indexOf("<")) : f.substring(0)).join("").split(",").join("");
    return clean.split("").reduce((a, b, ix) => a + (b === "}" ? (clean.substring(0, ix).split("").filter(f => f === "{").length - clean.substring(0, ix).split("").filter(f => f === "}").length) : 0), 0);
}