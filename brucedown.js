import { Marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { createHighlighter, bundledLanguages } from 'shiki'

/** @type {Promise<import('shiki').Highlighter> | null} */
let highlighterPromise = null

/**
 * Get or create the Shiki highlighter instance (lazy initialisation)
 * @returns {Promise<import('shiki').Highlighter>}
 */
function getHighlighter () {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light'],
      langs: []
    })
  }
  return highlighterPromise
}

/**
 * Highlight code with Shiki
 * @param {string} code
 * @param {string} lang
 * @param {import('shiki').BundledTheme} theme
 * @param {import('shiki').Highlighter} hl
 * @returns {Promise<string>}
 */
async function highlight (code, lang, theme, hl) {
  if (!lang) {
    // No language specified, just wrap it up plain
    const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<pre><code>${escaped}</code></pre>`
  }

  // Normalise language name
  const language = /** @type {import('shiki').BundledLanguage} */ (lang.toLowerCase())

  // Check if it's a known language before having a crack at loading it
  if (!(language in bundledLanguages)) {
    const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<pre><code class="language-${lang}">${escaped}</code></pre>`
  }

  // Load the language if not already loaded
  const loadedLangs = hl.getLoadedLanguages()
  if (!loadedLangs.includes(language)) {
    try {
      await hl.loadLanguage(language)
    } catch {
      // Language not supported, return unhighlighted
      const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return `<pre><code class="language-${lang}">${escaped}</code></pre>`
    }
  }

  let html = hl.codeToHtml(code, {
    lang: language,
    theme
  })
  // Add newlines after each line span for proper rendering in <pre>
  html = html.replace(/<\/span><span class="line">/g, '</span>\n<span class="line">')
  return html
}

/**
 * Convert GitHub Flavoured Markdown to HTML with syntax highlighting
 * @param {string} markdown - The markdown source to convert
 * @param {object} [options] - Optional configuration
 * @param {import('shiki').BundledTheme} [options.theme='github-light'] - Shiki theme to use
 * @returns {Promise<string>} The resulting HTML
 */
export default async function brucedown (markdown, options = {}) {
  const theme = /** @type {import('shiki').BundledTheme} */ (options.theme || 'github-light')
  const hl = await getHighlighter()

  // Make sure the theme is loaded
  const loadedThemes = hl.getLoadedThemes()
  if (!loadedThemes.includes(theme)) {
    await hl.loadTheme(theme)
  }

  // Collect code blocks for async highlighting
  /** @type {Array<{code: string, lang: string, index: number}>} */
  const codeBlocks = []
  let blockIndex = 0

  const marked = new Marked()
  marked.use(gfmHeadingId())
  marked.use({
    gfm: true,
    renderer: {
      code: (token) => {
        const index = blockIndex++
        codeBlocks.push({ code: token.text, lang: token.lang || '', index })
        return `<!--CODEBLOCK:${index}-->`
      },
      link ({ href, title, tokens }) {
        // Don't auto-link email addresses - just return the text
        if (href && href.startsWith('mailto:')) {
          const text = this.parser.parseInline(tokens)
          return text
        }
        // Default link rendering
        const text = this.parser.parseInline(tokens)
        const titleAttr = title ? ` title="${title}"` : ''
        return `<a href="${href}"${titleAttr}>${text}</a>`
      }
    }
  })

  // First pass: parse markdown, collecting code blocks
  let html = /** @type {string} */ (marked.parse(markdown + '\n'))

  // Highlight all code blocks in parallel
  const highlighted = await Promise.all(
    codeBlocks.map(block => highlight(block.code, block.lang, theme, hl))
  )

  // Swap placeholders for highlighted code
  for (let i = 0; i < codeBlocks.length; i++) {
    html = html.replace(`<!--CODEBLOCK:${i}-->`, highlighted[i])
  }

  return html
}

/**
 * Dispose of the highlighter instance to free resources.
 * Give this a call when you're done processing.
 */
export async function dispose () {
  if (highlighterPromise) {
    const hl = await highlighterPromise
    hl.dispose()
    highlighterPromise = null
  }
}
