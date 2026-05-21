import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search, Trash2, Download, Files, X } from 'lucide-react-native'
import * as Haptics from 'expo-haptics'
import { useVisionStore } from '@/store/vision-store'
import { MOCK_ANALYSES } from '@/lib/mock-data'
import { exportAnalysisJSON } from '@/lib/storage'
import { ConfidenceBadge } from '@/components/ui/badge'
import { formatTimestamp, formatFileSize } from '@/lib/utils'

export default function DocumentsScreen() {
  const { analyses, removeAnalysis, clearHistory } = useVisionStore()
  const [search, setSearch] = useState('')

  const data = analyses.length > 0 ? analyses : MOCK_ANALYSES
  const filtered = data.filter(a =>
    a.fileName.toLowerCase().includes(search.toLowerCase()) ||
    a.documentTypeLabel.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    Alert.alert('Delete', 'Delete this analysis?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeAnalysis(id) },
    ])
  }

  const handleClearAll = () => {
    Alert.alert('Clear All', 'Delete all analysis history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear All', style: 'destructive', onPress: () => { clearHistory(); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning) } },
    ])
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Documents</Text>
            <Text style={styles.subtitle}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</Text>
          </View>
          {data.length > 0 && (
            <TouchableOpacity style={styles.clearBtn} onPress={handleClearAll} activeOpacity={0.7}>
              <Trash2 size={14} color="#f87171" />
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Search size={15} color="#475569" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search documents…"
            placeholderTextColor="#334155"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X size={15} color="#475569" />
            </TouchableOpacity>
          )}
        </View>

        {/* List */}
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.rowIcon}>
                <Files size={16} color="#06b6d4" />
              </View>
              <View style={styles.rowInfo}>
                <Text style={styles.rowName} numberOfLines={1}>{item.fileName}</Text>
                <Text style={styles.rowMeta}>{item.documentTypeLabel} · {formatFileSize(item.fileSize)}</Text>
                <Text style={styles.rowDate}>{formatTimestamp(item.timestamp)}</Text>
              </View>
              <View style={styles.rowRight}>
                <ConfidenceBadge confidence={item.confidence} />
                <View style={styles.rowActions}>
                  <TouchableOpacity onPress={() => exportAnalysisJSON(item)} style={styles.iconBtn}>
                    <Download size={15} color="#64748b" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconBtn}>
                    <Trash2 size={15} color="#64748b" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Files size={36} color="#1e293b" />
              <Text style={styles.emptyText}>No documents yet</Text>
              <Text style={styles.emptyHint}>Scan a document to get started</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#020817' },
  container: { flex: 1, padding: 16, gap: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: '#f1f5f9' },
  subtitle: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#475569', marginTop: 2 },
  clearBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8,
    backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)',
  },
  clearBtnText: { fontFamily: 'Inter-Medium', fontSize: 12, color: '#f87171' },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 12, paddingVertical: 10,
  },
  searchIcon: {},
  searchInput: { flex: 1, fontFamily: 'Inter-Regular', fontSize: 14, color: '#e2e8f0' },
  list: { paddingBottom: 24 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: 14, padding: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  rowIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(6,182,212,0.1)', borderWidth: 1, borderColor: 'rgba(6,182,212,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  rowInfo: { flex: 1 },
  rowName: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#e2e8f0' },
  rowMeta: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#475569', marginTop: 2 },
  rowDate: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#334155', marginTop: 1 },
  rowRight: { alignItems: 'flex-end', gap: 6 },
  rowActions: { flexDirection: 'row', gap: 8 },
  iconBtn: { padding: 4 },
  separator: { height: 8 },
  empty: { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyText: { fontFamily: 'Inter-Medium', fontSize: 15, color: '#334155' },
  emptyHint: { fontFamily: 'Inter-Regular', fontSize: 13, color: '#1e293b' },
})
