## [2.0.0](https://github.com/rvagg/brucedown/compare/v1.1.1...v2.0.0) (2026-01-24)

### ⚠ BREAKING CHANGES

* Package is now ESM-only and works in both Node.js
and browsers. API changed from `brucedown(md, callback)` to
`await brucedown(md)`. Output format changed from Pygments CSS
classes to Shiki inline styles.

### Features

* modernise to ESM with async API, replace Pygments with Shiki ([#8](https://github.com/rvagg/brucedown/issues/8)) ([0cd9efc](https://github.com/rvagg/brucedown/commit/0cd9efc39fec6a235e94c4f7de319e90077078ee))
