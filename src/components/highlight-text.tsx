interface HighlightTextProps {
  text: string
  keywords: string[]
  className?: string
}

export function HighlightText({ text, keywords, className = '' }: HighlightTextProps) {
  if (!keywords.length) return <span className={className}>{text}</span>

  const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'))

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isKeyword = keywords.some((keyword) => keyword.toLowerCase() === part.toLowerCase())
        return isKeyword ? (
          <span key={i} className="text-red-500 rounded-sm px-0.5">
            {part}
          </span>
        ) : (
          part
        )
      })}
    </span>
  )
}
