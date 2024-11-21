import { Token } from "./tokenizer.js";

interface ParserObject {
    TokensConsumed: number
    // constructor(tokens: number) { this.TokensConsumed = tokens }
}

export class Selector implements ParserObject {
    Name: string
    Tags: [string, string][]
    TokensConsumed: number

    constructor(name: string, tags: [string, string][], tokens: number) {
        // super(tokens)
        this.Name = name
        this.Tags = tags
        this.TokensConsumed = tokens
    }
}

export function Parse(tokens: Token[]): ParserObject | undefined {
    return ParseSelector(tokens)
}

function ParseSelector(tokens: Token[]): ParserObject | undefined {
    if (tokens[0].tokenType != "Name") return
    const name = tokens[0]
    if (tokens.length >= 3 &&
        tokens[1].tokenType == "AttrName" && tokens[2].tokenType == "AttrValue") {
        return new Selector(name.text, [[tokens[1].text, tokens[2].text]], 3)
    }
    return new Selector(name.text, [], 1)

    // const tags: { [key: string]: string } = {}
    /*const tags = [] as [string, string][]
    let i = 1 // token count#
    let last_key = ""
    for (const token of tokens.slice(1)) {
        if (token.tokenType == "AttrName") {
            last_key = token.text
        } else if (token.tokenType == "AttrValue") {
            // tags[last_key] = token.text
            tags.push([last_key, token.text])
        } else break
        i++
    }

    return new Selector(name.text, tags, i)*/
}
