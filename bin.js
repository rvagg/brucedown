#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import brucedown, { dispose } from './brucedown.js'

function usageAndExit (code = 1) {
  console.error('Usage: brucedown <markdown file> [output file]')
  process.exit(code)
}

if (process.argv[2] === '--help' || process.argv[2] === '-h') {
  usageAndExit(0)
}

if (process.argv.length < 3) {
  usageAndExit()
}

const inputFile = process.argv[2]
const outputFile = process.argv[3]

let input
try {
  input = readFileSync(inputFile, 'utf8')
} catch (err) {
  console.error(`Error reading file "${inputFile}": ${err.message}`)
  process.exit(1)
}

try {
  const html = await brucedown(input)

  if (outputFile) {
    writeFileSync(outputFile, html, 'utf8')
  } else {
    process.stdout.write(html)
  }
} catch (err) {
  console.error(`Error processing markdown: ${err.message}`)
  process.exit(1)
} finally {
  dispose()
}
