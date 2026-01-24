## [2.0.2](https://github.com/rvagg/brucedown/compare/v2.0.1...v2.0.2) (2026-01-24)

### Bug Fixes

* cached highlighter promise for single instance ([#10](https://github.com/rvagg/brucedown/issues/10)) ([915dfba](https://github.com/rvagg/brucedown/commit/915dfbae1456a795bd95ea6ed49c34bb42392972))

## [2.0.1](https://github.com/rvagg/brucedown/compare/v2.0.0...v2.0.1) (2026-01-24)

### Bug Fixes

* add heading id links, newlines in <pre> codeblocks, no auto-email links ([#9](https://github.com/rvagg/brucedown/issues/9)) ([dd7c3fc](https://github.com/rvagg/brucedown/commit/dd7c3fc971c2f2ac3f21d02424a94412989aed0f))

## [2.0.0](https://github.com/rvagg/brucedown/compare/v1.1.1...v2.0.0) (2026-01-24)

### ⚠ BREAKING CHANGES

* Package is now ESM-only and works in both Node.js
and browsers. API changed from `brucedown(md, callback)` to
`await brucedown(md)`. Output format changed from Pygments CSS
classes to Shiki inline styles.

### Features

* modernise to ESM with async API, replace Pygments with Shiki ([#8](https://github.com/rvagg/brucedown/issues/8)) ([0cd9efc](https://github.com/rvagg/brucedown/commit/0cd9efc39fec6a235e94c4f7de319e90077078ee))
