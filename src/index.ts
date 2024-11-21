import { Parse } from "./parser.js";
import { Tokenize } from "./tokenizer.js";

const source = 'html [aaaa=bbbbbb] "hello this is a string"'
const all_tokens = Tokenize(source)
// all_tokens.map(x => console.log(x))

const tokens = all_tokens.filter(x => x.tokenType != "Whitespace")
const tree = Parse(tokens)
console.log(tree)
