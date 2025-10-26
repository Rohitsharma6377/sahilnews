import Link from 'next/link'

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="text-emerald-600"
        aria-hidden
      >
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#g)" />
        <path
          d="M8 12h8M8 16h5M8 8h8"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-heading text-xl font-bold leading-none">
        SahilNews
      </span>
    </Link>
  )
}
