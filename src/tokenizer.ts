interface Token {
    text: string
    consumed: number
    tokenType: "Name" | "AttrName" | "AttrValue"
}

export function Tokenize(text: string) {
    const nameToken = scanName(text)
    const tokens = [nameToken]
    let i = nameToken.consumed

    if (text[i] == " ") i++  // skip space
    tokens.push(...scanAttribute(text.slice(i)))

    tokens.map(x => console.log(x))
}

function scanName(text: string): Token {
    const end_chars = [" ", "[", "{"]
    const i = Math.min(...end_chars.map(s => text.indexOf(s)).filter(x => x > -1))
    return { text: text.slice(0, i), consumed: i, tokenType: "Name" }
}

function scanAttribute(text: string): Token[] {
    if (text[0] != "[") return []
    const tokens = [] as Token[]

    let i = text.indexOf("=")
    if (i < 0) return []
    tokens.push({ text: text.slice(1, i), consumed: i, tokenType: "AttrName" })
    i++

    const k = text.slice(i).indexOf("]")
    if (k < 0) return []
    tokens.push({ text: text.slice(i, i + k), consumed: k + 2, tokenType: "AttrValue" })
    return tokens
}
