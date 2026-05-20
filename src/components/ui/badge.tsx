import { cn } from '@/lib/utils'

type BadgeVariant = 'cyan' | 'purple' | 'green' | 'yellow' | 'red' | 'slate' | 'blue' | 'pink'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  purple: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  yellow: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  red: 'bg-red-500/15 text-red-400 border-red-500/30',
  slate: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  pink: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
}

const dotColors: Record<BadgeVariant, string> = {
  cyan: 'bg-cyan-400',
  purple: 'bg-violet-400',
  green: 'bg-emerald-400',
  yellow: 'bg-amber-400',
  red: 'bg-red-400',
  slate: 'bg-slate-400',
  blue: 'bg-blue-400',
  pink: 'bg-pink-400',
}

export function Badge({ variant = 'slate', dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  )
}

export function ConfidenceBadge({ confidence }: { confidence: number }) {
  const variant: BadgeVariant =
    confidence >= 90 ? 'green' : confidence >= 75 ? 'cyan' : confidence >= 60 ? 'yellow' : 'red'
  const label =
    confidence >= 90 ? 'High' : confidence >= 75 ? 'Good' : confidence >= 60 ? 'Moderate' : 'Low'

  return (
    <Badge variant={variant} dot>
      {label} · {confidence}%
    </Badge>
  )
}
