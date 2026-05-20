'use client'

import { useMemo } from 'react'
import { FileText, Target, Clock, ShieldCheck } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { MetricCard } from '@/components/dashboard/metric-card'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { DocumentTypeChart } from '@/components/dashboard/document-type-chart'
import { RecentAnalyses } from '@/components/dashboard/recent-analyses'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useVisionStore } from '@/store/vision-store'
import { MOCK_WEEKLY_DATA, MOCK_DOCUMENT_TYPES, MOCK_ANALYSES } from '@/lib/mock-data'
import { formatDuration } from '@/lib/utils'

export default function DashboardPage() {
  const { analyses, removeAnalysis } = useVisionStore()

  const allAnalyses = useMemo(() => {
    const combined = [...analyses]
    if (combined.length === 0) return MOCK_ANALYSES
    return combined
  }, [analyses])

  const metrics = useMemo(() => {
    const total = allAnalyses.length
    const avgConfidence = total
      ? Math.round(allAnalyses.reduce((sum, a) => sum + a.confidence, 0) / total)
      : 0
    const totalTime = allAnalyses.reduce((sum, a) => sum + a.processingTime, 0)
    const avgTime = total ? Math.round(totalTime / total) : 0
    return { total, avgConfidence, avgTime }
  }, [allAnalyses])

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Documents Analyzed"
            value={metrics.total}
            icon={FileText}
            color="cyan"
            trend={{ value: 23, label: 'vs last week' }}
            index={0}
          />
          <MetricCard
            title="Avg Confidence"
            value={`${metrics.avgConfidence}%`}
            subtitle="AI accuracy score"
            icon={Target}
            color="violet"
            trend={{ value: 2.4, label: 'vs last week' }}
            index={1}
          />
          <MetricCard
            title="Avg Processing"
            value={formatDuration(metrics.avgTime || 2100)}
            subtitle="Per document"
            icon={Clock}
            color="emerald"
            trend={{ value: -12, label: 'faster vs last week' }}
            index={2}
          />
          <MetricCard
            title="AI Validations"
            value={Math.round(metrics.total * 0.94)}
            subtitle="Auto-validated"
            icon={ShieldCheck}
            color="amber"
            trend={{ value: 5, label: 'vs last week' }}
            index={3}
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Processing Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageChart data={MOCK_WEEKLY_DATA} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Types</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentTypeChart data={MOCK_DOCUMENT_TYPES} />
            </CardContent>
          </Card>
        </div>

        {/* Recent analyses + OCR Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentAnalyses
                analyses={allAnalyses}
                onDelete={removeAnalysis}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Module Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'OCR Engine', status: 'Demo', color: 'amber' },
                  { name: 'AI Classifier', status: 'Active', color: 'emerald' },
                  { name: 'Field Extractor', status: 'Active', color: 'emerald' },
                  { name: 'OpenAI Vision', status: 'Not configured', color: 'slate' },
                  { name: 'Google Vision', status: 'Not configured', color: 'slate' },
                  { name: 'AWS Textract', status: 'Not configured', color: 'slate' },
                  { name: 'Azure Doc Intel', status: 'Not configured', color: 'slate' },
                ].map((mod) => (
                  <div key={mod.name} className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{mod.name}</span>
                    <span
                      className={`text-xs font-medium ${
                        mod.color === 'emerald'
                          ? 'text-emerald-400'
                          : mod.color === 'amber'
                          ? 'text-amber-400'
                          : 'text-slate-600'
                      }`}
                    >
                      {mod.status}
                    </span>
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
