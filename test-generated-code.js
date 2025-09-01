// Test the updated snippet generation
import { generateFinProSnippet } from './src/story-utils/snippets.js'

// Test with the exact args from the FinPro story
const testArgs = {
  backgroundColor: '--color-background-secondary',
  textColor: '--color-text-primary',
  borderColor: '--color-border-hover',
  fontSize: '--typography-fontSize-base',
  fontWeight: '--typography-fontWeight-medium',
  letterSpacing: '0.025em',
  padding: '--spacing-2',
  borderRadius: '--border-radius-lg',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderBottomWidth: '4px',
  hoverBorderBottomWidth: '3px',
  showLabel: true,
  hoverBackgroundColor: '--color-background-primary',
  hoverTextColor: '--color-text-primary',
  hoverBorderColor: '--color-border-hover',
  hoverBoxShadow: '--shadow-md',
  labelFontSize: '--typography-fontSize-sm',
  labelFontWeight: '--typography-fontWeight-medium',
  labelLetterSpacing: '0.05em',
  labelTextColor: '--color-text-secondary',
  boxShadow: '--component-card-shadow'
}

console.log('Testing generateFinProSnippet with FinPro story args...')
const result = generateFinProSnippet(testArgs)
console.log('Generated code:')
console.log(result)
