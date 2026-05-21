import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { X, Layers, FileText, CreditCard, Receipt, FileSearch, Building, ShieldCheck, Clipboard } from 'lucide-react-native'
import { TEMPLATES } from '@/lib/mock-data'

const ICON_MAP: Record<string, any> = {
  FileText, CreditCard, Receipt, FileSearch, Building, ShieldCheck, Clipboard,
  Layers, default: FileText,
}

export default function TemplatesScreen() {
  const categories = Array.from(new Set(TEMPLATES.map(t => t.category)))

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Templates</Text>
          <Text style={styles.subtitle}>{TEMPLATES.length} pre-built extractors</Text>
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <X size={18} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={TEMPLATES}
        keyExtractor={t => t.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={categories.map(cat => TEMPLATES.findIndex(t => t.category === cat))}
        renderItem={({ item: t, index }) => {
          const Icon = ICON_MAP[t.icon] ?? ICON_MAP.default
          const isFirst = TEMPLATES.findIndex(t2 => t2.category === t.category) === index
          return (
            <>
              {isFirst && (
                <Text style={styles.catHeader}>{t.category}</Text>
              )}
              <View style={styles.card}>
                <View style={[styles.cardIcon, { borderColor: `${t.color}40`, backgroundColor: `${t.color}15` }]}>
                  <Icon size={18} color={t.color} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{t.name}</Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>{t.description}</Text>
                  <View style={styles.fieldChips}>
                    {t.fields.slice(0, 3).map(f => (
                      <View key={f} style={styles.chip}>
                        <Text style={styles.chipText}>{f}</Text>
                      </View>
                    ))}
                    {t.fields.length > 3 && (
                      <Text style={styles.chipMore}>+{t.fields.length - 3}</Text>
                    )}
                  </View>
                </View>
              </View>
            </>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#020817' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: 16, paddingBottom: 8,
  },
  title: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: '#f1f5f9' },
  subtitle: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#475569', marginTop: 2 },
  closeBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  list: { paddingHorizontal: 16, paddingBottom: 32, gap: 8 },
  catHeader: {
    fontFamily: 'Inter-SemiBold', fontSize: 11, color: '#475569',
    textTransform: 'uppercase', letterSpacing: 0.8,
    backgroundColor: '#020817', paddingVertical: 8,
  },
  card: {
    flexDirection: 'row', gap: 12, padding: 14,
    backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  cardIcon: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
  cardInfo: { flex: 1, gap: 4 },
  cardName: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#f1f5f9' },
  cardDesc: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#64748b', lineHeight: 17 },
  fieldChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  chip: {
    paddingHorizontal: 7, paddingVertical: 2, borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  chipText: { fontFamily: 'Inter-Regular', fontSize: 10, color: '#64748b' },
  chipMore: { fontFamily: 'Inter-Medium', fontSize: 10, color: '#334155', alignSelf: 'center' },
})
