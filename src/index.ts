import { Tokenize } from "./tokenizer.js";

const source = 'html [aaaa=bbbbbb] "hello this is a string"'
const tokens = Tokenize(source)
tokens.map(x => console.log(x))
