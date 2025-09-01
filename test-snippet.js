// Test the current generateFinProSnippet function
const { generateFinProSnippet } = require('./src/story-utils/snippets.ts');

// Test with the current story args
const testArgs = {
  headerGap: "mb-3",
  dropdownGap: "gap-4",
  backgroundColor: '--color-background-secondary',
  textColor: '--color-text-primary',
  borderColor: "--color-border-hover",
  fontSize: "--typography-fontSize-sm",
  fontWeight: "--typography-fontWeight-medium",
  letterSpacing: "0.025em",
  padding: '--spacing-2',
  borderRadius: "--border-radius-lg",
  borderWidth: '1px',
  borderStyle: 'solid',
  borderBottomWidth: "4px",
  hoverBorderBottomWidth: '3px',
  showLabel: true,
  hoverBackgroundColor: "--color-background-tertiary",
  hoverTextColor: "--color-text-primary",
  hoverBorderColor: "--color-border-hover",
  hoverBoxShadow: "--shadow-md",
  labelFontSize: "--typography-fontSize-xs",
  labelFontWeight: "--typography-fontWeight-normal",
  labelLetterSpacing: "0.1em",
  labelTextColor: "--color-text-secondary",
  boxShadow: "--component-card-shadow"
};

console.log(generateFinProSnippet(testArgs));
