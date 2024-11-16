interface Token {
    text: string
    consumed: number
    tokenType: "Name" | "AttrName" | "AttrValue" | "TextBody" | "Whitespace"
}

export function Tokenize(text: string) {
    const tokens = scanSelector(text)
    tokens.push(...scanSpaces(text.slice(getOffset(tokens))))
    tokens.push(...scanBody(text.slice(getOffset(tokens))))

    tokens.map(x => console.log(x))
}

function scanBody(text: string): Token[] {
    if (text[0] == "{") {
        throw new Error("Unimplemented")
    } else if (text[0] == '"') {
        const i = text.slice(1).indexOf('"') + 1
        return [{ text: text.slice(1, i), consumed: i + 1, tokenType: "TextBody" }]
    } else {
        return []
    }
}

function scanSelector(text: string): Token[] {
    const nameToken = scanName(text)
    const tokens = [nameToken]

    tokens.push(...scanSpaces(text.slice(getOffset(tokens))))
    tokens.push(...scanAttribute(text.slice(getOffset(tokens))))
    return tokens
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

function scanSpaces(text: string): Token[] {
    const s = /\s*/.exec(text)?.[0]
    return s && s.length > 0 ? [
        { text: s, consumed: s.length, tokenType: "Whitespace" }] : []
}

function getOffset(tokens: Token[]): number {
    return tokens.reduce((s, x) => s + x.consumed, 0)
}
