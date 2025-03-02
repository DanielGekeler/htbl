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

## License
Copyright 2024 Daniel Gekeler

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
