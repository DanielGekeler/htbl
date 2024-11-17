export interface Token {
    text: string
    consumed: number
    tokenType: "Name" | "AttrName" | "AttrValue" | "TextBody" | "Whitespace" | "BodyBegin" | "BodyEnd"
}

export function Tokenize(text: string) {
    return scanElement(text)
}

function scanElement(text: string): Token[] {
    const tokens = scanSelector(text)
    applyScanner(scanSpaces, text, tokens)
    applyScanner(scanBody, text, tokens)
    return tokens
}

function scanBody(text: string): Token[] {
    if (text[0] == "{") {
        const tokens = scanElement(text)
        applyScanner(scanSpaces, text, tokens)
        if (text[getOffset(tokens)] == "}") {
            tokens.push({ text: "}", consumed: 1, tokenType: "BodyEnd" })
        }
        return tokens
    } else if (text[0] == '"') {
        const i = text.slice(1).indexOf('"') + 1
        return [{ text: text.slice(1, i), consumed: i + 1, tokenType: "TextBody" }]
    } else {
        return []
    }
}

function scanSelector(text: string): Token[] {
    const tokens = scanSpaces(text)
    if (text.startsWith("{")) {
        tokens.push({ text: "{", consumed: 1, tokenType: "BodyBegin" })
    }

    applyScanner(scanSpaces, text, tokens)
    applyScanner(scanName, text, tokens)
    applyScanner(scanSpaces, text, tokens)
    applyScanner(scanAttribute, text, tokens)
    return tokens
}

function scanName(text: string): Token {
    const end_chars = [" ", "[", "{", '"']
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

function applyScanner(f: (text: string) => Token | Token[], text: string, tokens: Token[]) {
    const res = f(text.slice(getOffset(tokens)))
    if (Array.isArray(res))
        tokens.push(...res)
    else tokens.push(res)
}
