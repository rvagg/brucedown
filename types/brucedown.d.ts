/**
 * Convert GitHub Flavoured Markdown to HTML with syntax highlighting
 * @param {string} markdown - The markdown source to convert
 * @param {object} [options] - Optional configuration
 * @param {import('shiki').BundledTheme} [options.theme='github-light'] - Shiki theme to use
 * @returns {Promise<string>} The resulting HTML
 */
export default function brucedown(markdown: string, options?: {
    theme?: import("shiki").BundledTheme | undefined;
}): Promise<string>;
/**
 * Dispose of the highlighter instance to free resources.
 * Give this a call when you're done processing.
 */
export function dispose(): void;
//# sourceMappingURL=brucedown.d.ts.map