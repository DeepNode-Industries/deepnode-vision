import { Tabs, usePathname } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LayoutDashboard, Files, ScanLine, BarChart3, Settings } from 'lucide-react-native'
import * as Haptics from 'expo-haptics'

const TABS = [
  { name: 'index', label: 'Home', icon: LayoutDashboard },
  { name: 'documents', label: 'Docs', icon: Files },
  { name: 'scanner', label: 'Scan', icon: ScanLine, highlight: true },
  { name: 'analytics', label: 'Stats', icon: BarChart3 },
  { name: 'settings', label: 'Config', icon: Settings },
]

function TabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {TABS.map((tab, index) => {
        const active = state.index === index
        const Icon = tab.icon

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              navigation.navigate(tab.name)
            }}
          >
            {tab.highlight ? (
              <View style={[styles.scanButton, active && styles.scanButtonActive]}>
                <Icon size={26} color="#67e8f9" strokeWidth={1.8} />
              </View>
            ) : (
              <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
                <Icon size={20} color={active ? '#22d3ee' : '#64748b'} strokeWidth={1.8} />
              </View>
            )}
            <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive, tab.highlight && styles.labelHighlight]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="documents" />
      <Tabs.Screen name="scanner" />
      <Tabs.Screen name="analytics" />
      <Tabs.Screen name="settings" />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#020817',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 4,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(6,182,212,0.12)',
    borderColor: 'rgba(6,182,212,0.3)',
  },
  scanButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(6,182,212,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(6,182,212,0.4)',
    marginTop: -8,
  },
  scanButtonActive: {
    backgroundColor: '#0891b2',
    borderColor: '#06b6d4',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  label: {
    fontSize: 9,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.3,
  },
  labelActive: { color: '#22d3ee' },
  labelInactive: { color: '#475569' },
  labelHighlight: { marginTop: 2 },
})
