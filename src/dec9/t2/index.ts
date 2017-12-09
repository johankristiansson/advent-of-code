export function go(rawInput: string): number {
    const filteredIgnored = rawInput.split("!!").join("").split("!").map((r, ix) => ix === 0 ? r : r.substring(1)).join("");
    const garbage = filteredIgnored.split(">").map(f => ~f.indexOf("<") ? f.substring(f.indexOf("<")+1) : "").join("");
    return garbage.length;
}