import { useCallback, useState } from 'react'

interface UseCopyToClipboardOptions {
  timeout?: number
}

interface UseCopyToClipboardReturn {
  copy: (value: string) => Promise<boolean>
  copied: boolean
  error: Error | null
}

/**
 * Provides a handy helper for copying text to the clipboard with feedback.
 */
export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}): UseCopyToClipboardReturn {
  const { timeout = 1500 } = options
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const copy = useCallback(async (value: string) => {
    if (!value) return false

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(value)
      } else {
        throw new Error('Clipboard API not supported')
      }

      setCopied(true)
      setError(null)

      window.setTimeout(() => setCopied(false), timeout)
      return true
    } catch (err) {
      const copyError = err instanceof Error ? err : new Error('Failed to copy to clipboard')
      setError(copyError)
      return false
    }
  }, [timeout])

  return { copy, copied, error }
}

