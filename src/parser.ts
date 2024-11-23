import { Token } from "./tokenizer.js";

interface ParserObject {
    TokensConsumed: number
}

export class Selector implements ParserObject {
    Name: string
    Tags: [string, string][]
    TokensConsumed: number

    constructor(name: string, tags: [string, string][], tokens: number) {
        this.Name = name
        this.Tags = tags
        this.TokensConsumed = tokens
    }
}

export class TextBody implements ParserObject {
    Content: string
    TokensConsumed: number

    constructor(content: string, tokens: number) {
        this.Content = content
        this.TokensConsumed = tokens
    }
}

export class Body implements ParserObject {
    Elements: ParserObject[]
    TokensConsumed: number

    constructor(elements: ParserObject[], tokens: number) {
        this.Elements = elements
        this.TokensConsumed = tokens
    }
}

export class Element implements ParserObject {
    Selector: ParserObject
    Body: ParserObject
    TokensConsumed: number

    constructor(selector: ParserObject, body: ParserObject, tokens: number) {
        this.Selector = selector
        this.Body = body
        this.TokensConsumed = tokens
    }
}

export function Parse(tokens: Token[]): ParserObject[] {
    const elements = [] as ParserObject[]
    let i = 0
    while (i + 1 < tokens.length) {
        const element = ParseElement(tokens.slice(i))
        if (!element) return elements
        i += element.TokensConsumed
        elements.push(element)
    }
    return elements
}

function ParseElement(tokens: Token[]): ParserObject | undefined {
    const selector = ParseSelector(tokens)
    if (!selector) return
    const body = ParseBody(tokens.slice(selector.TokensConsumed))
    if (!body) return
    return new Element(selector, body,
        selector.TokensConsumed + body.TokensConsumed)
}

function ParseSelector(tokens: Token[]): ParserObject | undefined {
    if (tokens[0].tokenType != "Name") return
    const name = tokens[0]
    if (tokens.length >= 3 &&
        tokens[1].tokenType == "AttrName" && tokens[2].tokenType == "AttrValue") {
        return new Selector(name.text, [[tokens[1].text, tokens[2].text]], 3)
    }
    return new Selector(name.text, [], 1)
}

function ParseBody(tokens: Token[]): ParserObject | undefined {
    if (tokens.length > 0 && tokens[0].tokenType == "TextBody")
        return new TextBody(tokens[0].text, 1)

    if (tokens.length > 0 && tokens[0].tokenType == "BodyBegin") {
        let i = 1
        const elements = Parse(tokens.slice(i))
        i += elements.reduce((x, y) => x + y.TokensConsumed, 0)
        if (tokens[i].tokenType != "BodyEnd") return
        return new Body(elements, i + 1)
    }
    return
}
