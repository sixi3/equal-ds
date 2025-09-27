import React from 'react'

export interface LoaderProps {
  /** Size of the loader in pixels (default: 168) */
  size?: number
  /** Size of each cell in pixels (default: 52) */
  cellSize?: number
  /** Spacing between cells in pixels (default: 1) */
  cellSpacing?: number
  /** Number of cells per row/column (default: 3) */
  cells?: number
}

/**
 * A ripple loader animation using design system colors
 */
export const Loader: React.FC<LoaderProps> = ({
  size,
  cellSize = 24,
  cellSpacing = 1,
  cells = 3,
}) => {
  const totalSize = size || (cells * (cellSize + 2 * cellSpacing))

  return (
    <>
      <style>
        {`
          @keyframes table-ripple {
            0% {
              background-color: transparent;
            }
            30% {
              background-color: var(--cell-color);
            }
            60% {
              background-color: transparent;
            }
            100% {
              background-color: transparent;
            }
          }
        `}
      </style>
      <div
        className="flex flex-col items-center"
        style={{
          width: `${totalSize}px`,
          height: `${totalSize}px`,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {Array.from({ length: cells * cells }, (_, i) => (
          <div
            key={i}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              margin: `${cellSpacing}px`,
              backgroundColor: 'transparent',
              boxSizing: 'border-box',
              borderRadius: '4px',
              animation: '1.5s table-ripple ease infinite',
              animationDelay: `${(i % 4) * 100}ms`,
              '--cell-color': [
                'var(--color-primary-400)', // #C1E4FB
                'var(--color-primary-500)', // #0F3340
                'var(--color-primary-600)', // #0F1F40
                'var(--color-primary-700)', // #0074A5
                'var(--color-primary-800)', // #556A7D
                'var(--color-primary-900)', // #475A66
                'var(--color-brand-primary)', // #0F3340
                'var(--color-brand-secondary)', // #0F1F40
                'var(--color-primary-300)', // #C3E7FF
              ][i % 9],
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  )
}
