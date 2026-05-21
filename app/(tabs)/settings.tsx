import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Settings, Zap, Globe, Shield, Cpu, Database, Info, ChevronRight, LogOut } from 'lucide-react-native'
import * as Haptics from 'expo-haptics'
import { useVisionStore } from '@/store/vision-store'
import { Card, CardContent } from '@/components/ui/card'
import { router } from 'expo-router'

const PROVIDERS = [
  { id: 'demo', name: 'Demo Mode', desc: 'Simulated AI, no API key needed', icon: Zap, color: '#10b981' },
  { id: 'openai', name: 'OpenAI Vision', desc: 'GPT-4o multimodal', icon: Globe, color: '#06b6d4' },
  { id: 'google', name: 'Google Vision AI', desc: 'Document AI + Vision', icon: Globe, color: '#3b82f6' },
  { id: 'aws', name: 'AWS Textract', desc: 'Structured extraction', icon: Database, color: '#f59e0b' },
  { id: 'azure', name: 'Azure Doc Intelligence', desc: 'Form recognizer', icon: Shield, color: '#8b5cf6' },
  { id: 'tesseract', name: 'Tesseract OCR', desc: 'Local open-source', icon: Cpu, color: '#94a3b8' },
]

export default function SettingsScreen() {
  const { clearHistory } = useVisionStore()
  const [activeProvider, setActiveProvider] = useState('demo')
  const [demoMode, setDemoMode] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  const toggle = (fn: () => void) => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); fn() }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Settings</Text>

        {/* AI Provider */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AI Provider</Text>
          <Card>
            {PROVIDERS.map((p, i) => (
              <TouchableOpacity
                key={p.id}
                style={[styles.providerRow, i < PROVIDERS.length - 1 && styles.rowBorder]}
                activeOpacity={0.7}
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setActiveProvider(p.id) }}
              >
                <View style={[styles.providerIcon, { borderColor: `${p.color}40`, backgroundColor: `${p.color}15` }]}>
                  <p.icon size={15} color={p.color} />
                </View>
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName}>{p.name}</Text>
                  <Text style={styles.providerDesc}>{p.desc}</Text>
                </View>
                <View style={[styles.radio, activeProvider === p.id && styles.radioActive, { borderColor: p.color }]}>
                  {activeProvider === p.id && <View style={[styles.radioDot, { backgroundColor: p.color }]} />}
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Preferences</Text>
          <Card>
            <View style={[styles.prefRow, styles.rowBorder]}>
              <View>
                <Text style={styles.prefTitle}>Demo Mode</Text>
                <Text style={styles.prefDesc}>Simulated analysis — no API calls</Text>
              </View>
              <Switch
                value={demoMode}
                onValueChange={(v) => toggle(() => setDemoMode(v))}
                trackColor={{ false: '#1e293b', true: '#0891b2' }}
                thumbColor="#fff"
              />
            </View>
            <View style={styles.prefRow}>
              <View>
                <Text style={styles.prefTitle}>Auto-save</Text>
                <Text style={styles.prefDesc}>Save analyses to history automatically</Text>
              </View>
              <Switch
                value={autoSave}
                onValueChange={(v) => toggle(() => setAutoSave(v))}
                trackColor={{ false: '#1e293b', true: '#0891b2' }}
                thumbColor="#fff"
              />
            </View>
          </Card>
        </View>

        {/* Data */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Data</Text>
          <Card>
            <TouchableOpacity
              style={[styles.menuRow, styles.rowBorder]}
              activeOpacity={0.7}
              onPress={() => router.push('/about')}
            >
              <Info size={16} color="#64748b" />
              <Text style={styles.menuLabel}>About DeepNode Vision</Text>
              <ChevronRight size={15} color="#334155" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); clearHistory() }}
            >
              <LogOut size={16} color="#f87171" />
              <Text style={[styles.menuLabel, styles.menuLabelDanger]}>Clear History</Text>
              <ChevronRight size={15} color="#334155" />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>DeepNode Vision v1.0.0</Text>
          <Text style={styles.footerSub}>DeepNode Industries © 2026</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#020817' },
  content: { padding: 16, gap: 4, paddingBottom: 40 },
  title: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: '#f1f5f9', marginBottom: 12 },
  section: { gap: 8, marginBottom: 12 },
  sectionLabel: { fontFamily: 'Inter-SemiBold', fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.8, marginLeft: 4 },
  providerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  rowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(255,255,255,0.05)' },
  providerIcon: { width: 34, height: 34, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  providerInfo: { flex: 1 },
  providerName: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#e2e8f0' },
  providerDesc: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#475569', marginTop: 1 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, alignItems: 'center', justifyContent: 'center', borderColor: '#334155' },
  radioActive: {},
  radioDot: { width: 8, height: 8, borderRadius: 4 },
  prefRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, gap: 12 },
  prefTitle: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#e2e8f0' },
  prefDesc: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#475569', marginTop: 1 },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  menuLabel: { flex: 1, fontFamily: 'Inter-Medium', fontSize: 14, color: '#e2e8f0' },
  menuLabelDanger: { color: '#f87171' },
  footer: { alignItems: 'center', paddingTop: 8, gap: 4 },
  footerText: { fontFamily: 'Inter-Medium', fontSize: 13, color: '#334155' },
  footerSub: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#1e293b' },
})
