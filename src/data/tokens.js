// Design Tokens ESM facade - mirrors generated CJS tokens
// This file re-exports from tokens.cjs so it always stays in sync with tokens.json

// Note: Importing a CommonJS module from ESM returns the module.exports object.
// Our generated tokens.cjs also sets `module.exports.default = module.exports.tokens`,
// so we normalize both shapes below.

import cjs from './tokens.cjs'

const tokens = cjs?.tokens ?? cjs?.default ?? cjs

export { tokens }
export const {
  colors = {},
  spacing = {},
  typography = {},
  borderRadius = {},
  sizing = {},
  shadows = {},
  opacity = {},
  zIndex = {},
  transitions = {},
  breakpoints = {},
} = cjs

export default tokens