import Link from 'next/link'

type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="container mt-4 text-sm text-slate-600"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {c.href ? (
              <Link href={c.href} className="hover:text-emerald-600">
                {c.label}
              </Link>
            ) : (
              <span className="text-slate-900 dark:text-slate-200">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && <span className="text-slate-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
