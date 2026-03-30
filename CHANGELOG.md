## [2.0.5](https://github.com/rvagg/brucedown/compare/v2.0.4...v2.0.5) (2026-03-30)

### Trivial Changes

* **deps-dev:** bump typescript from 5.9.3 to 6.0.2 ([d029b11](https://github.com/rvagg/brucedown/commit/d029b11cfff6bb581297b7c6df633133bdd55007))
* update deps & upgrade to typescript 6 ([6c8ecf4](https://github.com/rvagg/brucedown/commit/6c8ecf429b335a7c12796d8446767ac627bf4e24))

## [2.0.4](https://github.com/rvagg/brucedown/compare/v2.0.3...v2.0.4) (2026-03-09)

### Trivial Changes

* **deps:** bump shiki from 3.23.0 to 4.0.1 ([#12](https://github.com/rvagg/brucedown/issues/12)) ([193d4b1](https://github.com/rvagg/brucedown/commit/193d4b10f6f6756db3daaff6dc35c4d1489f6056))

## [2.0.3](https://github.com/rvagg/brucedown/compare/v2.0.2...v2.0.3) (2026-01-26)

### Bug Fixes

* revert manual newlining ([#11](https://github.com/rvagg/brucedown/issues/11)) ([aafd549](https://github.com/rvagg/brucedown/commit/aafd549f7decbc136070bc6d366d03d4ba0456fd))

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
