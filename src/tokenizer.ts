export function Tokenize(text: string) {
    console.log(scanName(text))
}

function scanName(text: string): [string, number] {
    const end_chars = [" ", "[", "{"]
    const i = Math.min(...end_chars.map(s => text.indexOf(s)).filter(x => x > -1))
    return [text.slice(0, i), i]
}
