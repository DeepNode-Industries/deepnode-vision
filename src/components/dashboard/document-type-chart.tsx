'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, type TooltipProps } from 'recharts'
import type { DocumentTypeCount } from '@/lib/types'

interface DocumentTypeChartProps {
  data: DocumentTypeCount[]
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="rounded-xl border border-white/15 bg-dark-800/95 backdrop-blur-sm px-3 py-2 shadow-xl">
      <p className="text-xs text-slate-400">{item.name}</p>
      <p className="text-sm font-bold" style={{ color: item.payload.color }}>
        {item.value} docs
      </p>
    </div>
  )
}

export function DocumentTypeChart({ data }: DocumentTypeChartProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="flex items-center gap-6">
      {/* Donut chart */}
      <div className="relative h-36 w-36 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={44}
              outerRadius={64}
              paddingAngle={2}
              dataKey="count"
              nameKey="type"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} opacity={0.85} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-bold text-white">{total}</span>
          <span className="text-xs text-slate-500">Total</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-2">
        {data.map((item) => (
          <div key={item.type} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-400 truncate">{item.type}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-white font-medium">{item.count}</span>
              <span className="text-xs text-slate-600">{Math.round((item.count / total) * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
