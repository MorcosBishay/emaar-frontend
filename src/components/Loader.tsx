import type { FC } from 'react'

interface LoaderProps {
  size?: number
  color?: string
  ringColor?: string
}

export const Loader: FC<LoaderProps> = ({
  size = 100,
  color = '#3b82f6',
  ringColor = '#60a5fa',
}) => {
  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="animate-pulse"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="35" fill={color} />
      </svg>
      <svg
        className="absolute top-0 left-0 animate-spin"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={ringColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="70 200"
        />
      </svg>
    </div>
  )
}
