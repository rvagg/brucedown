# Brucedown

**A bonza GitHub-style Markdown to HTML converter**

[![CI](https://github.com/rvagg/brucedown/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/rvagg/brucedown/actions/workflows/test-and-release.yml)

[![NPM](https://nodei.co/npm/brucedown.svg?style=flat&data=n,v&color=blue)](https://nodei.co/npm/brucedown/)

Converts GitHub Flavoured Markdown (GFM) to HTML with syntax highlighting powered by [Shiki](https://shiki.style/) (the same highlighting engine used by VS Code).

## Installation

```bash
npm install brucedown
```

## Usage

### As a module

```javascript
import brucedown from 'brucedown'

const markdown = `
# G'day World

Some **bold** text and \`inline code\`.

\`\`\`javascript
const greeting = "G'day!";
console.log(greeting);
\`\`\`
`

const html = await brucedown(markdown)
console.log(html)
```

### With options

```javascript
import brucedown from 'brucedown'

const html = await brucedown(markdown, {
  theme: 'github-dark'  // Any Shiki theme
})
```

### CLI

```bash
brucedown input.md output.html
brucedown input.md > output.html
```

### Cleanup

If you're processing heaps of files in a long-running process and want to free resources when done:

```javascript
import brucedown, { dispose } from 'brucedown'

// Process your files...
const html = await brucedown(markdown)

// Release Shiki's WASM/grammar resources
dispose()
```

For CLI usage or short-lived processes, this isn't necessary - process exit handles cleanup.

## Features

- **GitHub Flavoured Markdown** - Tables, strikethrough, task lists, autolinks
- **Syntax Highlighting** - Powered by Shiki with VS Code-quality highlighting
- **200+ Languages** - All languages supported by VS Code
- **Multiple Themes** - Any VS Code theme (`github-light`, `github-dark`, `one-dark-pro`, etc.)
- **Browser & Node.js** - Works in both environments

## API

### `brucedown(markdown, [options])`

Converts markdown to HTML.

- `markdown` (string) - The markdown source
- `options` (object, optional)
  - `theme` (string) - Shiki theme name (default: `'github-light'`)

Returns: `Promise<string>` - The resulting HTML

### `dispose()`

Releases Shiki's WASM and grammar resources. Only needed for long-running processes; CLI usage doesn't require this.

## Licence

MIT Licence. Copyright (c) Rod Vagg.
