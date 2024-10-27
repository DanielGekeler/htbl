interface Token {
    text: string
    consumed: number
    tokenType: "Name"
}

export function Tokenize(text: string) {
    console.log(scanName(text))
}

function scanName(text: string): Token {
    const end_chars = [" ", "[", "{"]
    const i = Math.min(...end_chars.map(s => text.indexOf(s)).filter(x => x > -1))
    return { text: text.slice(0, i), consumed: i, tokenType: "Name" }
}
