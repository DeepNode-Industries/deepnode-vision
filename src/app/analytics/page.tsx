'use client'

import { useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { FileText, Target, AlertTriangle, Clock } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { MetricCard } from '@/components/dashboard/metric-card'
import { DocumentTypeChart } from '@/components/dashboard/document-type-chart'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useVisionStore } from '@/store/vision-store'
import { MOCK_ANALYSES, MOCK_DOCUMENT_TYPES } from '@/lib/mock-data'

const DAILY_DATA = Array.from({ length: 14 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (13 - i))
  return {
    date: `${date.getMonth() + 1}/${date.getDate()}`,
    documents: Math.floor(Math.random() * 20 + 3),
    avgConfidence: Math.floor(Math.random() * 15 + 82),
  }
})

export default function AnalyticsPage() {
  const { analyses } = useVisionStore()

  const allAnalyses = useMemo(() => {
    const combined = [...analyses]
    return combined.length === 0 ? MOCK_ANALYSES : combined
  }, [analyses])

  const metrics = useMemo(() => {
    const total = allAnalyses.length
    const avgConf = total
      ? Math.round(allAnalyses.reduce((s, a) => s + a.confidence, 0) / total)
      : 0
    const errors = allAnalyses.filter(a => a.warnings.length > 0).length
    const totalTime = allAnalyses.reduce((s, a) => s + a.processingTime, 0)
    const estimatedHoursSaved = Math.round((total * 8) / 60)
    return { total, avgConf, errors, totalTime, estimatedHoursSaved }
  }, [allAnalyses])

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Documents" value={metrics.total} icon={FileText} color="cyan" index={0} />
          <MetricCard title="Avg Confidence" value={`${metrics.avgConf}%`} icon={Target} color="violet" index={1} />
          <MetricCard title="With Warnings" value={metrics.errors} icon={AlertTriangle} color="amber" index={2} />
          <MetricCard
            title="Time Saved"
            value={`~${metrics.estimatedHoursSaved}h`}
            subtitle="Estimated"
            icon={Clock}
            color="emerald"
            index={3}
          />
        </div>

        {/* Daily trend */}
        <Card>
          <CardHeader>
            <CardTitle>14-Day Processing Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DAILY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(13,20,36,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    itemStyle={{ color: '#06b6d4' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="documents"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#06b6d4' }}
                    name="Documents"
                  />
                  <Line
                    type="monotone"
                    dataKey="avgConfidence"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#8b5cf6' }}
                    name="Avg Confidence"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Document type distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Document Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentTypeChart data={MOCK_DOCUMENT_TYPES} />
            </CardContent>
          </Card>

          {/* Common warnings */}
          <Card>
            <CardHeader>
              <CardTitle>Common Warnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: 'Low confidence score', count: 12, pct: 18 },
                  { label: 'Image quality issues', count: 8, pct: 12 },
                  { label: 'Partial text detected', count: 6, pct: 9 },
                  { label: 'Amount mismatch', count: 4, pct: 6 },
                  { label: 'Document rotation', count: 3, pct: 4 },
                ].map(w => (
                  <div key={w.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">{w.label}</span>
                      <span className="text-slate-500">{w.count} · {w.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                        style={{ width: `${w.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
