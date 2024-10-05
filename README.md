# HyperTextBlockLanguage

CSS like syntax transpiling to html

## Example Document

```css
html {
    head {
        meta[charset='utf-8'] {}
        title "Page Title"
    }

    body {
        h1 "Hello World!"
    }
}
```

## Syntax definition

```EBNF
document = element;

selector = name, {attribute};
name = ? alphanumeric string ?;
attribute = "[", name, "=", name, "]";

body = '"', ? ANY CONTENT STRING ?, '"' |
    "{", element*, "}";

element = selector, body;
```
