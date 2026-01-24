/* eslint-env mocha */

import * as chai from 'chai'
import brucedown, { dispose } from '../brucedown.js'

const { assert } = chai

describe('brucedown', () => {
  after(() => {
    dispose()
  })

  describe('basic markdown', () => {
    it('should convert headings', async () => {
      const result = await brucedown('# Heading 1\n## Heading 2')
      assert.include(result, '<h1')
      assert.include(result, 'Heading 1')
      assert.include(result, '<h2')
      assert.include(result, 'Heading 2')
    })

    it('should convert paragraphs', async () => {
      const result = await brucedown('This is a paragraph.\n\nThis is another.')
      assert.include(result, '<p>This is a paragraph.</p>')
      assert.include(result, '<p>This is another.</p>')
    })

    it('should convert inline code', async () => {
      const result = await brucedown('Use `code` here')
      assert.include(result, '<code>code</code>')
    })

    it('should convert bold and italic', async () => {
      const result = await brucedown('**bold** and *italic*')
      assert.include(result, '<strong>bold</strong>')
      assert.include(result, '<em>italic</em>')
    })

    it('should convert links', async () => {
      const result = await brucedown('[link](https://example.com)')
      assert.include(result, '<a href="https://example.com">link</a>')
    })
  })

  describe('GFM features', () => {
    it('should convert tables', async () => {
      const md = `
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`
      const result = await brucedown(md)
      assert.include(result, '<table>')
      assert.include(result, '<th>Header 1</th>')
      assert.include(result, '<td>Cell 1</td>')
    })

    it('should convert strikethrough', async () => {
      const result = await brucedown('~~deleted~~')
      assert.include(result, '<del>deleted</del>')
    })

    it('should convert task lists', async () => {
      const md = `
- [x] Done
- [ ] Not done
`
      const result = await brucedown(md)
      assert.include(result, 'type="checkbox"')
      assert.include(result, 'checked')
    })
  })

  describe('code highlighting', () => {
    it('should highlight JavaScript code', async () => {
      const md = '```js\nconst a = "b";\n```'
      const result = await brucedown(md)
      // Shiki wraps in pre with class="shiki"
      assert.include(result, 'shiki')
      assert.include(result, '<pre')
      assert.include(result, '<code')
      // Should have syntax highlighting (style attributes or span elements)
      assert.include(result, 'const')
    })

    it('should highlight Python code', async () => {
      const md = '```python\ndef hello():\n    print("world")\n```'
      const result = await brucedown(md)
      assert.include(result, 'shiki')
      assert.include(result, 'def')
      assert.include(result, 'hello')
    })

    it('should handle unknown languages gracefully', async () => {
      const md = '```unknownlang123\nsome code\n```'
      const result = await brucedown(md)
      // Should not throw, should still render the code
      assert.include(result, 'some code')
    })

    it('should handle code blocks without language', async () => {
      const md = '```\nplain code\n```'
      const result = await brucedown(md)
      assert.include(result, 'plain code')
    })
  })

  describe('options', () => {
    it('should accept custom theme', async () => {
      const md = '```js\nconst x = 1;\n```'
      const result = await brucedown(md, { theme: 'github-dark' })
      assert.include(result, 'shiki')
      // Different theme should still work
      assert.include(result, 'const')
    })
  })

  describe('complex documents', () => {
    it('should handle mixed content', async () => {
      const md = `
# Title

Some **bold** text with \`inline code\`.

\`\`\`javascript
function test() {
  return true;
}
\`\`\`

## Section

- Item 1
- Item 2
`
      const result = await brucedown(md)
      assert.include(result, '<h1')
      assert.include(result, '<strong>bold</strong>')
      assert.include(result, '<code>inline code</code>')
      assert.include(result, 'shiki')
      assert.include(result, '<h2')
      assert.include(result, '<li>Item 1</li>')
    })
  })
})
