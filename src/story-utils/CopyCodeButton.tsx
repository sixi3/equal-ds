import React, { useState } from 'react'

export function CopyCodeButton({ code, generator, args, label = 'Copy Code' }: {
  code?: string
  generator?: (args: any) => string
  args?: any
  label?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = typeof generator === 'function' ? generator(args) : (code || '')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      // noop
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
      aria-label="Copy example code"
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}
