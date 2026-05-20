'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ExternalLink, AlertTriangle } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input, Select } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [demoMode, setDemoMode] = useState(true)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Demo mode banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-400">Demo Mode Active</p>
            <p className="text-xs text-slate-400 mt-0.5">
              All analysis uses simulated AI. Configure real API keys below to enable live processing.
            </p>
          </div>
        </div>

        {/* OCR Provider */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>OCR Provider</CardTitle>
              <Badge variant="yellow" dot>Demo</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Active Provider"
              options={[
                { value: 'demo', label: 'DeepNode Demo (Simulated)' },
                { value: 'tesseract', label: 'Tesseract OCR (Local)' },
                { value: 'google', label: 'Google Vision AI' },
                { value: 'aws', label: 'AWS Textract' },
                { value: 'azure', label: 'Azure Document Intelligence' },
              ]}
            />
            <Input
              label="Confidence Threshold (%)"
              type="number"
              defaultValue="75"
              min="0"
              max="100"
              hint="Analyses below this threshold will be flagged for manual review"
            />
          </CardContent>
        </Card>

        {/* AI Model */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>AI Model Provider</CardTitle>
              <Badge variant="slate" dot>Not configured</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="AI Model"
              options={[
                { value: 'demo', label: 'DeepNode Demo Mode' },
                { value: 'gpt4o', label: 'OpenAI GPT-4o Vision' },
                { value: 'gpt4v', label: 'OpenAI GPT-4 Vision Preview' },
              ]}
            />
            <Input
              label="OpenAI API Key"
              type="password"
              placeholder="sk-..."
              hint="Get your API key at platform.openai.com/api-keys"
            />
          </CardContent>
        </Card>

        {/* Cloud Vision APIs */}
        <Card>
          <CardHeader>
            <CardTitle>Cloud Vision APIs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Google Vision API Key"
              type="password"
              placeholder="AIza..."
              hint="Google Cloud Console → APIs & Services → Credentials"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input label="AWS Access Key ID" type="password" placeholder="AKIA..." />
              <Input label="AWS Secret Access Key" type="password" placeholder="..." />
            </div>
            <Input
              label="AWS Region"
              defaultValue="us-east-1"
              hint="e.g. us-east-1, us-west-2"
            />
            <Input
              label="Azure Document Intelligence Endpoint"
              placeholder="https://your-resource.cognitiveservices.azure.com/"
            />
            <Input label="Azure Document Intelligence Key" type="password" placeholder="..." />
          </CardContent>
        </Card>

        {/* Webhooks */}
        <Card>
          <CardHeader>
            <CardTitle>Webhooks & Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Webhook URL"
              placeholder="https://your-server.com/webhook"
              hint="DeepNode Vision will POST analysis results to this URL"
            />
            <Input
              label="Webhook Secret"
              type="password"
              placeholder="whsec_..."
              hint="Used to sign webhook payloads for verification"
            />
          </CardContent>
        </Card>

        {/* Export & Data */}
        <Card>
          <CardHeader>
            <CardTitle>Export & Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Default Export Format"
              options={[
                { value: 'json', label: 'JSON' },
                { value: 'csv', label: 'CSV' },
                { value: 'xml', label: 'XML' },
              ]}
            />
            <Select
              label="Data Retention"
              options={[
                { value: '7d', label: '7 days' },
                { value: '30d', label: '30 days' },
                { value: '90d', label: '90 days' },
                { value: 'forever', label: 'Forever (localStorage)' },
              ]}
            />

            {/* Demo/Production toggle */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-dark-800/40 p-4">
              <div>
                <p className="text-sm font-medium text-white">Demo Mode</p>
                <p className="text-xs text-slate-500 mt-0.5">Use simulated AI instead of real providers</p>
              </div>
              <button
                onClick={() => setDemoMode(!demoMode)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  demoMode ? 'bg-cyan-500' : 'bg-white/20'
                }`}
              >
                <motion.span
                  animate={{ x: demoMode ? 20 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow"
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} loading={false} className="gap-2">
            {saved ? <Check className="w-4 h-4" /> : null}
            {saved ? 'Settings Saved!' : 'Save Settings'}
          </Button>
          <a
            href="https://github.com/anthropics/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            View documentation
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </AppShell>
  )
}
