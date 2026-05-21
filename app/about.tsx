import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { X, Cpu, Globe, Shield, Zap, Layers, Code2, CheckCircle2 } from 'lucide-react-native'
import Svg, { Defs, LinearGradient, Stop, Circle, Line, Rect } from 'react-native-svg'
import { Card, CardContent } from '@/components/ui/card'

const TECH_STACK = [
  { name: 'Expo SDK 52', desc: 'React Native runtime', color: '#06b6d4' },
  { name: 'Expo Router v4', desc: 'File-based navigation', color: '#8b5cf6' },
  { name: 'NativeWind v4', desc: 'Tailwind for React Native', color: '#22d3ee' },
  { name: 'Reanimated v3', desc: 'Native animations', color: '#a78bfa' },
  { name: 'Zustand', desc: 'AsyncStorage persistence', color: '#fbbf24' },
  { name: 'TypeScript', desc: 'Strict mode', color: '#3b82f6' },
]

const PROVIDERS = [
  { name: 'OpenAI Vision', icon: Zap, color: '#10b981' },
  { name: 'Google Vision AI', icon: Globe, color: '#3b82f6' },
  { name: 'AWS Textract', icon: Layers, color: '#f59e0b' },
  { name: 'Azure Doc Intelligence', icon: Shield, color: '#06b6d4' },
  { name: 'Tesseract OCR', icon: Cpu, color: '#8b5cf6' },
]

function DeepNodeMark({ size = 72 }: { size?: number }) {
  const cx = size / 2
  const r1 = size * 0.34, r2 = size * 0.13
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <LinearGradient id="about-grad" x1="0" y1="0" x2={size} y2={size} gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#06b6d4" />
          <Stop offset="100%" stopColor="#8b5cf6" />
        </LinearGradient>
      </Defs>
      <Rect width={size} height={size} rx={size * 0.22} fill="url(#about-grad)" opacity="0.1" />
      <Circle cx={cx} cy={cx} r={r1} stroke="url(#about-grad)" strokeWidth="1.5" fill="none" />
      <Circle cx={cx} cy={cx} r={r2} fill="url(#about-grad)" />
      <Line x1={cx} y1={size * 0.06} x2={cx} y2={cx - r1 + 2} stroke="url(#about-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1={cx} y1={cx + r1 - 2} x2={cx} y2={size * 0.94} stroke="url(#about-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1={size * 0.06} y1={cx} x2={cx - r1 + 2} y2={cx} stroke="url(#about-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1={cx + r1 - 2} y1={cx} x2={size * 0.94} y2={cx} stroke="url(#about-grad)" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  )
}

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <X size={18} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.logoWrap}>
            <DeepNodeMark size={80} />
          </View>
          <Text style={styles.appName}>DeepNode{' '}
            <Text style={styles.appNameGrad}>Vision</Text>
          </Text>
          <Text style={styles.appDesc}>AI-powered document intelligence platform</Text>
          <View style={styles.badges}>
            <View style={styles.versionBadge}><Text style={styles.versionText}>v1.0.0</Text></View>
            <View style={styles.demoBadge}>
              <View style={styles.demoDot} />
              <Text style={styles.demoText}>Demo Mode</Text>
            </View>
          </View>
        </View>

        {/* Tech stack */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Technology Stack</Text>
          <View style={styles.techGrid}>
            {TECH_STACK.map(t => (
              <View key={t.name} style={[styles.techCard, { borderColor: `${t.color}25` }]}>
                <Text style={[styles.techName, { color: t.color }]}>{t.name}</Text>
                <Text style={styles.techDesc}>{t.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* AI Providers */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AI Provider Integrations</Text>
          <Card>
            {PROVIDERS.map((p, i) => (
              <View key={p.name} style={[styles.provRow, i < PROVIDERS.length - 1 && styles.rowBorder]}>
                <p.icon size={15} color={p.color} />
                <Text style={styles.provName}>{p.name}</Text>
                <CheckCircle2 size={14} color="#1e293b" />
                <Text style={styles.provStatus}>Ready</Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>DeepNode Industries</Text>
          <Text style={styles.footerCopy}>© 2026. Todos los derechos reservados.</Text>
          <Text style={styles.footerBuilt}>Built with Expo · React Native · TypeScript</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#020817' },
  topBar: { alignItems: 'flex-end', padding: 16 },
  closeBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  content: { paddingHorizontal: 16, paddingBottom: 48, gap: 20 },
  hero: { alignItems: 'center', gap: 8 },
  logoWrap: {
    width: 100, height: 100, borderRadius: 28,
    backgroundColor: 'rgba(6,182,212,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  appName: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 30, color: '#f1f5f9' },
  appNameGrad: { color: '#22d3ee' },
  appDesc: { fontFamily: 'Inter-Regular', fontSize: 14, color: '#64748b', textAlign: 'center' },
  badges: { flexDirection: 'row', gap: 8, marginTop: 4 },
  versionBadge: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(6,182,212,0.3)', backgroundColor: 'rgba(6,182,212,0.1)',
  },
  versionText: { fontFamily: 'Inter-Medium', fontSize: 12, color: '#22d3ee' },
  demoBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(16,185,129,0.1)',
  },
  demoDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981' },
  demoText: { fontFamily: 'Inter-Medium', fontSize: 12, color: '#34d399' },
  section: { gap: 8 },
  sectionLabel: { fontFamily: 'Inter-SemiBold', fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.8 },
  techGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  techCard: {
    paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, minWidth: '46%', flex: 1,
  },
  techName: { fontFamily: 'Inter-SemiBold', fontSize: 13 },
  techDesc: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#475569', marginTop: 2 },
  provRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 13 },
  rowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(255,255,255,0.05)' },
  provName: { flex: 1, fontFamily: 'Inter-Medium', fontSize: 13, color: '#e2e8f0' },
  provStatus: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#334155' },
  footer: { alignItems: 'center', gap: 4, paddingTop: 8, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(255,255,255,0.06)' },
  footerBrand: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 14, color: '#475569' },
  footerCopy: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#334155' },
  footerBuilt: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#1e293b', marginTop: 2 },
})
