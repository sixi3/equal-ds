// Main exports
export { DesignSystemParser } from './designSystemParser'
export { TokenCategorizer } from './tokenCategorizer'
export { BaseControlGenerator } from './controlGenerators/baseControlGenerator'

// New auto-control exports
export { DesignSystemControlGenerator } from './controlGenerators/designSystemControlGenerator'
export { StorybookControlMapper } from './storybookControlMapper'
export { AutoControls, createAutoControls, createAutoStoryConfig, getCategoryControls } from './autoControls'



// Type exports
export type { 
  DesignSystemTokens, 
  ColorToken, 
  TypographyToken, 
  SpacingToken, 
  BorderToken, 
  ShadowToken, 
  TransitionToken, 
  TransformToken 
} from './designSystemParser'

export type {
  StorybookControl,
  ControlGroup,
  ComponentControls
} from './controlGenerators/designSystemControlGenerator'

export type {
  MappedStorybookControl,
  MappedStorybookControls
} from './storybookControlMapper'

export type {
  AutoControlsOptions
} from './autoControls'

// Legacy utility functions (for backward compatibility)
import { DesignSystemParser } from './designSystemParser'
import { TokenCategorizer } from './tokenCategorizer'

export const createDesignSystemParser = (projectRoot?: string) => {
  return new DesignSystemParser(projectRoot)
}

export const createTokenCategorizer = () => {
  return new TokenCategorizer()
}

export const parseDesignSystem = (projectRoot?: string) => {
  const parser = createDesignSystemParser(projectRoot)
  const categorizer = createTokenCategorizer()
  const tokens = parser.parseAllTokens()
  const categorized = categorizer.categorizeTokens(tokens)
  return { tokens, categorized, parser, categorizer }
}
